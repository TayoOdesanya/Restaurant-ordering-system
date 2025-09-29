import express from 'express';
import { prisma } from '../server.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get orders (admin only)
router.get('/', authenticateToken, async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        orderItems: {
          include: {
            menuItem: {
              select: {
                id: true,
                name: true,
                price: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Group orders by table
    const ordersByTable = orders.reduce((acc, order) => {
      const tableNumber = order.tableNumber;
      if (!acc[tableNumber]) {
        acc[tableNumber] = [];
      }
      acc[tableNumber].push(order);
      return acc;
    }, {});

    res.json({
      orders,
      ordersByTable
    });
  } catch (error) {
    next(error);
  }
});

// Kitchen dashboard route (no auth required)
router.get('/kitchen', async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        status: {
          in: ['paid', 'preparing', 'ready']
        }
      },
      include: {
        orderItems: {
          include: {
            menuItem: {
              select: {
                id: true,
                name: true,
                price: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Group orders by table
    const ordersByTable = orders.reduce((acc, order) => {
      const tableNumber = order.tableNumber;
      if (!acc[tableNumber]) {
        acc[tableNumber] = [];
      }
      acc[tableNumber].push(order);
      return acc;
    }, {});

    res.json({
      orders,
      ordersByTable
    });
  } catch (error) {
    next(error);
  }
});

export default router;
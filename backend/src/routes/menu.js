import express from 'express';
import { prisma } from '../server.js';

const router = express.Router();

// Get all available menu items
router.get('/', async (req, res, next) => {
  try {
    const menuItems = await prisma.menuItem.findMany({
      where: {
        isAvailable: true
      },
      include: {
        inventory: {
          select: {
            quantityAvailable: true,
            lowStockThreshold: true
          }
        }
      },
      orderBy: {
        category: 'asc'
      }
    });

    // Filter out items with zero inventory
    const availableItems = menuItems.filter(item => {
      return !item.inventory || item.inventory.quantityAvailable > 0;
    });

    res.json(availableItems);
  } catch (error) {
    next(error);
  }
});

export default router;

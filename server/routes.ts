import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactMessageSchema, 
  insertReservationSchema, 
  insertMenuItemSchema 
} from "@shared/schema";
import { z } from "zod";
import { sendContactEmail } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes - all prefixed with /api
  
  // Get all menu items
  app.get("/api/menu", async (req, res) => {
    try {
      const menuItems = await storage.getAllMenuItems();
      res.json(menuItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch menu items" });
    }
  });
  
  // Get menu items by category
  app.get("/api/menu/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const menuItems = await storage.getMenuItemsByCategory(category);
      res.json(menuItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch menu items" });
    }
  });
  
  // Add a new menu item (admin only in a real app)
  app.post("/api/menu", async (req, res) => {
    try {
      const menuItemData = insertMenuItemSchema.parse(req.body);
      const menuItem = await storage.addMenuItem(menuItemData);
      res.status(201).json(menuItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid menu item data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to add menu item" });
      }
    }
  });
  
  // Submit a reservation
  app.post("/api/reservations", async (req, res) => {
    try {
      const reservationData = insertReservationSchema.parse(req.body);
      const reservation = await storage.createReservation(reservationData);
      res.status(201).json(reservation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid reservation data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create reservation" });
      }
    }
  });
  
  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      // First parse the request body with the schema
      const formData = insertContactMessageSchema.parse({
        ...req.body,
        createdAt: new Date().toISOString()
      });
      
      // Save to database
      const message = await storage.createContactMessage(formData);
      
      // Send an email notification using Nodemailer
      const emailSent = await sendContactEmail({
        to: "nostrings.cafe@gmail.com", // The destination email address
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.subject,
        message: formData.message
      });
      
      // Return appropriate response based on whether the email was sent
      res.status(201).json({ 
        message, 
        emailSent,
        notification: emailSent 
          ? "Message received and email notification sent" 
          : "Message saved but email notification could not be sent"
      });
    } catch (error) {
      console.error("Contact form submission error:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid message data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to submit message" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

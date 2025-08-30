import { 
  users, 
  menuItems, 
  reservations, 
  contactMessages,
  type User, 
  type InsertUser, 
  type MenuItem, 
  type InsertMenuItem,
  type Reservation,
  type InsertReservation,
  type ContactMessage,
  type InsertContactMessage
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Menu item methods
  getAllMenuItems(): Promise<MenuItem[]>;
  getMenuItemsByCategory(category: string): Promise<MenuItem[]>;
  addMenuItem(menuItem: InsertMenuItem): Promise<MenuItem>;
  
  // Reservation methods
  createReservation(reservation: InsertReservation): Promise<Reservation>;
  getReservations(): Promise<Reservation[]>;
  
  // Contact methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private menuItems: Map<number, MenuItem>;
  private reservations: Map<number, Reservation>;
  private contactMessages: Map<number, ContactMessage>;
  
  userCurrentId: number;
  menuItemCurrentId: number;
  reservationCurrentId: number;
  contactMessageCurrentId: number;

  constructor() {
    this.users = new Map();
    this.menuItems = new Map();
    this.reservations = new Map();
    this.contactMessages = new Map();
    
    this.userCurrentId = 1;
    this.menuItemCurrentId = 1;
    this.reservationCurrentId = 1;
    this.contactMessageCurrentId = 1;
    
    // Initialize with some sample menu items
    this.initializeMenuItems();
  }
  
  private initializeMenuItems() {
    const sampleMenuItems: InsertMenuItem[] = [
      {
        name: "Macher Jhol",
        description: "Traditional Bengali fish curry cooked with mustard oil, turmeric, and select spices.",
        price: "299",
        image: "https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "Main Course",
        tags: ["Popular"]
      },
      {
        name: "Kosha Mangsho",
        description: "Slow-cooked mutton in a rich, spicy gravy - a beloved Bengali delicacy.",
        price: "399",
        image: "https://images.unsplash.com/photo-1601050690117-94f5f7a16ae3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "Main Course",
        tags: ["Chef's Special"]
      },
      {
        name: "Mishti Doi",
        description: "Sweetened yogurt dessert caramelized to perfection - a traditional Bengali sweet treat.",
        price: "149",
        image: "https://images.unsplash.com/photo-1631452180539-96aca7d48617?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "Desserts",
        tags: ["Vegetarian", "Popular"]
      }
    ];
    
    sampleMenuItems.forEach(item => this.addMenuItem(item));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Menu item methods
  async getAllMenuItems(): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values());
  }
  
  async getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values()).filter(
      item => item.category === category
    );
  }
  
  async addMenuItem(insertMenuItem: InsertMenuItem): Promise<MenuItem> {
    const id = this.menuItemCurrentId++;
    const menuItem: MenuItem = { ...insertMenuItem, id };
    this.menuItems.set(id, menuItem);
    return menuItem;
  }
  
  // Reservation methods
  async createReservation(insertReservation: InsertReservation): Promise<Reservation> {
    const id = this.reservationCurrentId++;
    const reservation: Reservation = { 
      ...insertReservation, 
      id, 
      status: "pending" 
    };
    this.reservations.set(id, reservation);
    return reservation;
  }
  
  async getReservations(): Promise<Reservation[]> {
    return Array.from(this.reservations.values());
  }
  
  // Contact methods
  async createContactMessage(insertContactMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactMessageCurrentId++;
    const contactMessage: ContactMessage = { 
      ...insertContactMessage, 
      id, 
      read: false 
    };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }
  
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
}

export const storage = new MemStorage();

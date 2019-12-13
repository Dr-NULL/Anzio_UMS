import { Seed } from "../tool/orm";
import { Menu } from "../models/menu";

export const seedMenu = new Seed(Menu)
seedMenu.data = []
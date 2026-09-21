export const categories = ['Burgers', 'Pizza', 'Biryani', 'Pasta', 'Sandwiches', 'Wraps', 'Starters', 'Desserts', 'Drinks'];

import classicChickenBurger from '../assets/food/1-classic-chicken-burger.jpg';
import crispyVegBurger from '../assets/food/2-crispy-veg-burger.jpg';
import doubleCheeseBurger from '../assets/food/3-double-cheese-burger.jpg';
import bbqChickenBurger from '../assets/food/4-bbq-chicken-burger.jpg';
import margheritaPizza from '../assets/food/5-margherita-pizza.jpg';
import farmhousePizza from '../assets/food/6-farmhouse-pizza.jpg';
import pepperoniPizza from '../assets/food/7-pepperoni-pizza.jpg';
import bbqChickenPizza from '../assets/food/8-bbq-chicken-pizza.jpg';
import chickenBiryani from '../assets/food/9-chicken-biryani.jpg';
import hyderabadiChickenBiryani from '../assets/food/10-hyderabadi-chicken-biryani.jpg';
import paneerBiryani from '../assets/food/11-paneer-biryani.jpg';
import muttonBiryani from '../assets/food/12-mutton-biryani.jpg';
import chickenAlfredoPasta from '../assets/food/13-chicken-alfredo-pasta.jpg';
import arrabbiataPasta from '../assets/food/14-arrabbiata-pasta.jpg';
import mushroomWhiteSaucePasta from '../assets/food/15-mushroom-white-sauce-pasta.jpg';
import clubSandwich from '../assets/food/16-club-sandwich.jpg';
import grilledChickenSandwich from '../assets/food/17-grilled-chicken-sandwich.jpg';
import paneerTikkaSandwich from '../assets/food/18-paneer-tikka-sandwich.jpg';
import chickenTikkaWrap from '../assets/food/19-chicken-tikka-wrap.jpg';
import paneerTikkaWrap from '../assets/food/20-paneer-tikka-wrap.jpg';
import chickenWings from '../assets/food/21-chicken-wings.jpg';
import frenchFries from '../assets/food/22-french-fries.jpg';
import garlicBread from '../assets/food/23-garlic-bread.jpg';
import chicken65 from '../assets/food/24-chicken-65.jpg';
import chocolateBrownie from '../assets/food/25-chocolate-brownie.jpg';
import newYorkCheesecake from '../assets/food/26-new-york-cheesecake.jpg';
import coldCoffee from '../assets/food/27-cold-coffee.jpg';
import chocolateMilkshake from '../assets/food/28-chocolate-milkshake.jpg';
import freshLemonSoda from '../assets/food/29-fresh-lemon-soda.jpg';
import coke from '../assets/food/30-coke.jpg';

const img = {
  classicChickenBurger, crispyVegBurger, doubleCheeseBurger, bbqChickenBurger,
  margheritaPizza, farmhousePizza, pepperoniPizza, bbqChickenPizza,
  chickenBiryani, hyderabadiChickenBiryani, paneerBiryani, muttonBiryani,
  chickenAlfredoPasta, arrabbiataPasta, mushroomWhiteSaucePasta,
  clubSandwich, grilledChickenSandwich, paneerTikkaSandwich,
  chickenTikkaWrap, paneerTikkaWrap, chickenWings, frenchFries, garlicBread,
  chicken65, chocolateBrownie, newYorkCheesecake, coldCoffee,
  chocolateMilkshake, freshLemonSoda, coke
};

export const products = [
  { id: 1, name: 'Classic Chicken Burger', category: 'Burgers', price: 229, originalPrice: 249, unit: '1 serving', image: img.classicChickenBurger, rating: 4.7, stock: 14, veg: false, bestseller: true, description: 'Grilled chicken, lettuce, cheese and house sauce.' },
  { id: 2, name: 'Crispy Veg Burger', category: 'Burgers', price: 179, originalPrice: 199, unit: '1 serving', image: img.crispyVegBurger, rating: 4.5, stock: 10, veg: true, description: 'Crispy vegetable patty, lettuce and smoky mayo.' },
  { id: 3, name: 'Double Cheese Burger', category: 'Burgers', price: 279, originalPrice: 299, unit: '1 serving', image: img.doubleCheeseBurger, rating: 4.8, stock: 4, veg: false, bestseller: true, description: 'Two chicken patties with double cheese and pickles.' },
  { id: 4, name: 'BBQ Chicken Burger', category: 'Burgers', price: 259, originalPrice: 279, unit: '1 serving', image: img.bbqChickenBurger, rating: 4.6, stock: 0, veg: false, description: 'Chicken patty, onion, cheese and barbecue sauce.' },
  { id: 5, name: 'Margherita Pizza', category: 'Pizza', price: 299, originalPrice: 329, unit: '9 inch', image: img.margheritaPizza, rating: 4.6, stock: 16, veg: true, bestseller: true, description: 'Tomato, mozzarella and fresh basil.' },
  { id: 6, name: 'Farmhouse Pizza', category: 'Pizza', price: 399, originalPrice: 449, unit: '9 inch', image: img.farmhousePizza, rating: 4.7, stock: 9, veg: true, description: 'Peppers, onion, mushroom, corn and mozzarella.' },
  { id: 7, name: 'Pepperoni Pizza', category: 'Pizza', price: 499, originalPrice: 549, unit: '9 inch', image: img.pepperoniPizza, rating: 4.8, stock: 6, veg: false, bestseller: true, description: 'Pepperoni, mozzarella and tomato sauce.' },
  { id: 8, name: 'BBQ Chicken Pizza', category: 'Pizza', price: 479, originalPrice: 519, unit: '9 inch', image: img.bbqChickenPizza, rating: 4.5, stock: 0, veg: false, description: 'Barbecue chicken, onion and mozzarella.' },
  { id: 9, name: 'Chicken Biryani', category: 'Biryani', price: 299, originalPrice: 329, unit: 'Serves 1', image: img.chickenBiryani, rating: 4.7, stock: 18, veg: false, bestseller: true, description: 'Fragrant basmati rice with spiced chicken.' },
  { id: 10, name: 'Hyderabadi Chicken Biryani', category: 'Biryani', price: 349, originalPrice: 379, unit: 'Serves 1', image: img.hyderabadiChickenBiryani, rating: 4.8, stock: 12, veg: false, description: 'Dum-cooked chicken biryani with raita.' },
  { id: 11, name: 'Paneer Biryani', category: 'Biryani', price: 279, originalPrice: 299, unit: 'Serves 1', image: img.paneerBiryani, rating: 4.4, stock: 7, veg: true, description: 'Basmati rice, paneer and aromatic spices.' },
  { id: 12, name: 'Mutton Biryani', category: 'Biryani', price: 429, originalPrice: 469, unit: 'Serves 1', image: img.muttonBiryani, rating: 4.7, stock: 3, veg: false, description: 'Slow-cooked mutton layered with fragrant rice.' },
  { id: 13, name: 'Chicken Alfredo Pasta', category: 'Pasta', price: 329, originalPrice: 359, unit: '1 bowl', image: img.chickenAlfredoPasta, rating: 4.6, stock: 10, veg: false, description: 'Penne, grilled chicken and creamy Alfredo sauce.' },
  { id: 14, name: 'Arrabbiata Pasta', category: 'Pasta', price: 249, originalPrice: 279, unit: '1 bowl', image: img.arrabbiataPasta, rating: 4.4, stock: 11, veg: true, description: 'Penne tossed in a spicy tomato and garlic sauce.' },
  { id: 15, name: 'Mushroom White Sauce Pasta', category: 'Pasta', price: 279, originalPrice: 309, unit: '1 bowl', image: img.mushroomWhiteSaucePasta, rating: 4.5, stock: 5, veg: true, description: 'Creamy pasta with mushrooms and herbs.' },
  { id: 16, name: 'Club Sandwich', category: 'Sandwiches', price: 219, originalPrice: 239, unit: '4 pieces', image: img.clubSandwich, rating: 4.5, stock: 9, veg: false, description: 'Chicken, egg, lettuce and mayo on toasted bread.' },
  { id: 17, name: 'Grilled Chicken Sandwich', category: 'Sandwiches', price: 199, originalPrice: 219, unit: '2 pieces', image: img.grilledChickenSandwich, rating: 4.6, stock: 8, veg: false, description: 'Grilled chicken, cheese and peppers.' },
  { id: 18, name: 'Paneer Tikka Sandwich', category: 'Sandwiches', price: 189, originalPrice: 209, unit: '2 pieces', image: img.paneerTikkaSandwich, rating: 4.3, stock: 0, veg: true, description: 'Paneer tikka, onion and mint chutney.' },
  { id: 19, name: 'Chicken Tikka Wrap', category: 'Wraps', price: 229, originalPrice: 249, unit: '1 wrap', image: img.chickenTikkaWrap, rating: 4.7, stock: 13, veg: false, bestseller: true, description: 'Chicken tikka, onion and mint mayo in a soft wrap.' },
  { id: 20, name: 'Paneer Tikka Wrap', category: 'Wraps', price: 199, originalPrice: 219, unit: '1 wrap', image: img.paneerTikkaWrap, rating: 4.5, stock: 10, veg: true, description: 'Spiced paneer, peppers and mint mayo.' },
  { id: 21, name: 'Chicken Wings', category: 'Starters', price: 299, originalPrice: 329, unit: '6 pieces', image: img.chickenWings, rating: 4.8, stock: 12, veg: false, bestseller: true, description: 'Crispy wings tossed in a smoky hot sauce.' },
  { id: 22, name: 'French Fries', category: 'Starters', price: 129, originalPrice: 149, unit: 'Regular', image: img.frenchFries, rating: 4.4, stock: 20, veg: true, description: 'Crisp golden fries with house seasoning.' },
  { id: 23, name: 'Garlic Bread', category: 'Starters', price: 149, originalPrice: 169, unit: '4 pieces', image: img.garlicBread, rating: 4.3, stock: 15, veg: true, description: 'Toasted bread with garlic butter and herbs.' },
  { id: 24, name: 'Chicken 65', category: 'Starters', price: 279, originalPrice: 299, unit: '1 plate', image: img.chicken65, rating: 4.7, stock: 4, veg: false, description: 'Spicy fried chicken with curry leaves.' },
  { id: 25, name: 'Chocolate Brownie', category: 'Desserts', price: 149, originalPrice: 169, unit: '1 piece', image: img.chocolateBrownie, rating: 4.7, stock: 8, veg: true, description: 'Warm chocolate brownie with a fudgy centre.' },
  { id: 26, name: 'New York Cheesecake', category: 'Desserts', price: 199, originalPrice: 229, unit: '1 slice', image: img.newYorkCheesecake, rating: 4.8, stock: 0, veg: true, bestseller: true, description: 'Creamy baked cheesecake with a biscuit base.' },
  { id: 27, name: 'Cold Coffee', category: 'Drinks', price: 129, originalPrice: 149, unit: '300 ml', image: img.coldCoffee, rating: 4.6, stock: 18, veg: true, description: 'Chilled coffee blended with milk and ice.' },
  { id: 28, name: 'Chocolate Milkshake', category: 'Drinks', price: 159, originalPrice: 179, unit: '300 ml', image: img.chocolateMilkshake, rating: 4.7, stock: 12, veg: true, description: 'Rich chocolate shake topped with cocoa.' },
  { id: 29, name: 'Fresh Lemon Soda', category: 'Drinks', price: 99, originalPrice: 119, unit: '300 ml', image: img.freshLemonSoda, rating: 4.3, stock: 20, veg: true, description: 'Fresh lime, soda and a touch of salt.' },
  { id: 30, name: 'Coke', category: 'Drinks', price: 99, originalPrice: 99, unit: '330 ml', image: img.coke, rating: 4.2, stock: 25, veg: true, description: 'Chilled fizzy cola.' }
];

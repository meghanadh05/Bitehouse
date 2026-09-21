import classicChickenBurger from '../assets/food/1-classic-chicken-burger.jpg';
import crispyVegBurger from '../assets/food/2-crispy-veg-burger.jpg';
import doubleCheeseBurger from '../assets/food/3-double-cheese-burger.jpg';
import margheritaPizza from '../assets/food/5-margherita-pizza.jpg';
import farmhousePizza from '../assets/food/6-farmhouse-pizza.jpg';
import pepperoniPizza from '../assets/food/7-pepperoni-pizza.jpg';
import chickenBiryani from '../assets/food/9-chicken-biryani.jpg';
import hyderabadiChickenBiryani from '../assets/food/10-hyderabadi-chicken-biryani.jpg';
import paneerBiryani from '../assets/food/11-paneer-biryani.jpg';
import muttonBiryani from '../assets/food/12-mutton-biryani.jpg';
import coldCoffee from '../assets/food/27-cold-coffee.jpg';
import freshLemonSoda from '../assets/food/29-fresh-lemon-soda.jpg';

export const categories = ['All', 'Burgers', 'Pizza', 'Biryani', 'Drinks'];

export const products = [
  {
    id: 1,
    name: 'Classic Chicken Burger',
    category: 'Burgers',
    price: 229,
    image: classicChickenBurger
  },
  {
    id: 2,
    name: 'Crispy Veg Burger',
    category: 'Burgers',
    price: 179,
    image: crispyVegBurger
  },
  {
    id: 3,
    name: 'Double Cheese Burger',
    category: 'Burgers',
    price: 279,
    image: doubleCheeseBurger,
    available: false
  },
  {
    id: 4,
    name: 'Margherita Pizza',
    category: 'Pizza',
    price: 299,
    image: margheritaPizza
  },
  {
    id: 5,
    name: 'Farmhouse Pizza',
    category: 'Pizza',
    price: 399,
    image: farmhousePizza
  },
  {
    id: 6,
    name: 'Pepperoni Pizza',
    category: 'Pizza',
    price: 499,
    image: pepperoniPizza,
    available: false
  },
  {
    id: 7,
    name: 'Chicken Biryani',
    category: 'Biryani',
    price: 299,
    image: chickenBiryani
  },
  {
    id: 8,
    name: 'Hyderabadi Chicken Biryani',
    category: 'Biryani',
    price: 349,
    image: hyderabadiChickenBiryani
  },
  {
    id: 9,
    name: 'Paneer Biryani',
    category: 'Biryani',
    price: 279,
    image: paneerBiryani
  },
  {
    id: 10,
    name: 'Mutton Biryani',
    category: 'Biryani',
    price: 429,
    image: muttonBiryani,
    available: false
  },
  {
    id: 11,
    name: 'Cold Coffee',
    category: 'Drinks',
    price: 129,
    image: coldCoffee
  },
  {
    id: 12,
    name: 'Fresh Lemon Soda',
    category: 'Drinks',
    price: 99,
    image: freshLemonSoda
  }
];

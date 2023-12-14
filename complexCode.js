/* 
Filename: complexCode.js

This code is a complex implementation of a website navigation menu using JavaScript. 
It includes functions to create and add elements, handle event listeners, and manipulate the DOM.
The menu is created dynamically based on an array of menu items and supports nested submenus.
*/

// Utility function to create an element with optional attributes and inner text
function createElement(tagName, attributes, innerText) {
  const element = document.createElement(tagName);
  if (attributes) {
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }
  if (innerText) {
    element.innerText = innerText;
  }
  return element;
}

// Function to create a menu item with submenus
function createMenuItem(menuItem) {
  const menuItemDiv = createElement('div', { class: 'menu-item' });

  const menuItemTitle = createElement('span', { class: 'menu-item-title' }, menuItem.title);
  menuItemDiv.appendChild(menuItemTitle);

  if (menuItem.submenus) {
    const submenuContainer = createElement('div', { class: 'submenu-container' });
    for (const submenuItem of menuItem.submenus) {
      const submenuItemDiv = createMenuItem(submenuItem);
      submenuContainer.appendChild(submenuItemDiv);
    }
    menuItemDiv.appendChild(submenuContainer);
  }

  return menuItemDiv;
}

// Array of menu items
const menuItems = [
  {
    title: 'Home',
  },
  {
    title: 'Products',
    subMenus: [
      {
        title: 'Electronics',
        subMenus: [
          { title: 'Laptops' },
          { title: 'Smartphones' },
        ],
      },
      { title: 'Clothing' },
      { title: 'Furniture' },
    ],
  },
  {
    title: 'About Us',
  },
  {
    title: 'Contact',
  },
];

// Function to create the menu
function createMenu() {
  const menu = createElement('nav', { id: 'main-menu' });

  const menuList = createElement('ul');

  for (const menuItem of menuItems) {
    const menuItemLi = createElement('li');
    const menuItemDiv = createMenuItem(menuItem);
    menuItemLi.appendChild(menuItemDiv);
    menuList.appendChild(menuItemLi);
  }

  menu.appendChild(menuList);
  
  return menu;
}

// Function to handle click on menu items and toggle submenus
function handleMenuClick(menuItemDiv) {
  const submenuContainer = menuItemDiv.querySelector('.submenu-container');
  if (submenuContainer) {
    submenuContainer.classList.toggle('show');
  }
}

// Function to initialize the menu
function initMenu() {
  const menu = createMenu();
  document.body.appendChild(menu);

  const menuItems = document.querySelectorAll('.menu-item');
  for (const menuItem of menuItems) {
    menuItem.addEventListener('click', function () {
      handleMenuClick(menuItem);
    });
  }
}

// Initialize the menu
window.addEventListener('DOMContentLoaded', initMenu);
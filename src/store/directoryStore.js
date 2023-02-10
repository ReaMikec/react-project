class DirectoryStore {
  categories = [
    {
      id: 1,
      title: "hats",
      imageUrl: "https://i.ibb.co/mCbDTv9/hat.jpg",
      route: "shop/hats",
    },
    {
      id: 2,
      title: "jackets",
      imageUrl: "https://i.ibb.co/R6JZ8nL/jacket.jpg",
      route: "shop/jackets",
    },
    {
      id: 3,
      title: "sneakers",
      imageUrl: "https://i.ibb.co/Lkcvstz/sneakers.jpg",
      route: "shop/sneakers",
    },
    {
      id: 4,
      title: "womens",
      imageUrl: "https://i.ibb.co/RbQNLDp/womens.jpg",
      route: "shop/womens",
    },
    {
      id: 5,
      title: "mens",
      imageUrl: "https://i.ibb.co/Rc9GNkc/mens.jpg",
      route: "shop/mens",
    },
  ];

  addCategory = (category) => {
    this.categories.push(category);
  };

  removeCategory = (category) => {
    this.categories = this.categories.filter((c) => c !== category);
  };
}

export default new DirectoryStore();

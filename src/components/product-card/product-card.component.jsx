import { useContext } from "react";
import "./product-card.styles.scss";
import Button from "../button/button.component";
import { CartContext } from "../../contexts/cart.context";
import { Observer } from "mobx-react";
import store from "../../store/store";

const ProductCard = ({ product }) => {
  store.updateProduct(product);

  const { name, price, material, size, imageUrl } = store.product;

  const { addItemToCart } = useContext(CartContext);
  const addProductToCart = () => addItemToCart(product);

  return (
    <Observer>
      {() => (
        <div className="product-card-container">
          <img src={imageUrl} alt={`${name}`} />
          <div className="footer">
            <span className="name">{name}</span>
            <span className="size">Size: {size}</span>
            <span className="material">{material}</span>
            <span className="price">{price}€</span>
          </div>
          <Button buttonType="inverted" onClick={addProductToCart}>
            Add to cart
          </Button>
        </div>
      )}
    </Observer>
  );
};

export default ProductCard;

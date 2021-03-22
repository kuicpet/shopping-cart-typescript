import { Button } from "@material-ui/core";

// Types
import { CartItemType } from "../App";
// Styles
import { Wrapper } from "./Item.styles";


type Props = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void
}


const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
    <Wrapper>
        <img src={item.image} alt={item.title}/>
        <div>
            <h3>{item.title}</h3>
            <p>{item.description.length < 20 ? item.description : `${item.description.substring(0, 45)}...`}</p>
            <h3>${item.price}</h3>
        </div>
        <Button onClick={() => handleAddToCart(item)}>
            Add to Cart
        </Button>
    </Wrapper>
)

export default Item;
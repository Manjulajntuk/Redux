import { useEffect} from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../store/cartSlice';
import { getProducts } from '../store/productSlice';
import StatusCode from '../utils/StatusCode';
const Product = () => {
  const dispatch = useDispatch();
  //const [products,getProducts] = useState([]);//manuall so making comments
const {data: products, status} = useSelector(state => state.products);
  useEffect(()=>{
   // fetch('https://fakestoreapi.com/products').then(data => data.json()).then(result =>getProducts(result)) 
   // //manual ga api call nundi data vastundi now i am changing to thunk redux 
    dispatch(getProducts());

  }, []);
  if(status === StatusCode.LOADING){
    return <p>Loading.........</p>
  }

  if(status === StatusCode.ERROR){
    return <Alert key="danger" variant="danger">Something went wrong.........</Alert>
  }

const addToCart= (product)=>{
//dispatch
dispatch(add(product))

}
  const cards = products.map(product => ( 
  <div className="col-md-3" style={{marginBottom: '10px'}}>
    <Card key={product.id} className='h-100' style={{ width: '18rem' }} >
        <div className='text-center'>
            <Card.Img variant="top" src={product.image} style={{ width:'100px', height:'130px'}} />
            </div>
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>
                INR: {product.price}
              </Card.Text>
            </Card.Body>
            <Card.Footer style={{background : 'white'}}>
            <Button variant="primary" onClick={()=>addToCart(product)}>Add to Cart</Button>
            </Card.Footer>
      </Card>
    </div>
  ))

  return (
    <>
    <div className='row'>
      {cards}
    </div>
    </>
  )
}

export default Product
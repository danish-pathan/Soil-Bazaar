import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useFirebase } from "../context/Firebase";
import Grid from "@mui/material/Grid"; // Grid version 1
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!firebase.isLoggedIn) {
      navigate("/login");
    } else {
      firebase.listAllProducts().then((products) => setProducts(products.docs));
    }
  }, [firebase, navigate]);

  return (
    <Container className="card-container">
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {products.map((product) => (
          <Grid item xs={2} sm={4} md={4}>
            <Card
              key={product.id}
              // link={`/product/view/${product.id}`}
              id={product.id}
              {...product.data()}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default HomePage;

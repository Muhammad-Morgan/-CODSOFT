import React from "react";
import { useGlobalContext } from "../utilities/Context";
import { Link } from "react-router-dom";
const HeroPage = () => {
  const {fewProducts}=useGlobalContext()
  return (
    <>
      <article className="hero-page d-flex justify-content-center align-items-center">
        <div className="container-fluid cstm-hero row row-cols-1 row-cols-lg-2">
          <div className="text-container col">
            <h1
             className="mb-4">We are changing the way people shop</h1>
            <p className="mb-5">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
              repellat explicabo enim soluta temporibus asperiores aut obcaecati
              perferendis porro nobis.
            </p>
            <Link
            to='/products'
            className="btn cstm btn-primary btn-lg">
              Our Products
            </Link>
          </div>
          <div className="img-container col d-none d-lg-block">
            <img
              className="d-flex ms-auto"
              src="https://react-vite-comfy-store-v2.netlify.app/assets/hero1-deae5a1f.webp"
              alt="product"
            />
          </div>
        </div>
      </article>
      <footer className="products-list-container">
        <div className="container-fluid mx-ww">
          <h2 style={{ marginInline: "auto" }}>Featured Products</h2>
          <hr className="mb-5" style={{ marginInline: "auto" }} />
          <div className="products-list g-4 row row-cols-1 row-cols-md-2 row-cols-lg-3">
            {
              fewProducts.map((item)=>{
                const {id,img,name,price}=item
                return (
                  <Link
                  to={`/products/singleproduct/${id}`}
                  key={id}
                  className="col"
                  style={{ textDecoration: "none" }}
                >
                  <div className="card " style={{ marginInline: "auto", height: '400px'}}>
                    <div className="card-img">
                      <img className="img-fluid" src={img} alt={name} />
                    </div>
                    <div className="card-body text-center">
                      <h3>{name}</h3>
                      <p>${price}</p>
                    </div>
                  </div>
                </Link>
                )
              })
            }
          </div>
        </div>
      </footer>
    </>
  );
};

export default HeroPage;

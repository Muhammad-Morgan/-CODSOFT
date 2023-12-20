import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../utilities/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
const Products = () => {
  const { allProducts } = useGlobalContext();
  const [pageNumber, setPageNumber] = React.useState(1);
  return (
    <>
      <div className="container-fluid mb-0">
        <div className="prod" style={{ marginInline: "auto" }}>
          <div style={{ width: "95%", marginInline: "auto" }}>
            <h1 className="mb-3">Our Products</h1>
            <hr className="mx-ww mb-5" />
          </div>
          <div className="products-list g-4 row row-cols-1 row-cols-md-2 row-cols-lg-3">
            {allProducts.map((product) => {
              const { id, img, name, price } = product;
              if (pageNumber === 1) {
                if (id < 10) {
                  return (
                    <Link
                      key={id}
                      to={`/products/singleproduct/${id}`}
                      className="col"
                      style={{ textDecoration: "none" }}
                    >
                      <div className="card" style={{ marginInline: "auto" }}>
                        <div className="card-img">
                          <img className="img-fluid" src={img} alt={name} />
                        </div>
                        <div className="card-body text-center">
                          <h3>{name}</h3>
                          <p>${price}</p>
                        </div>
                      </div>
                    </Link>
                  );
                }
              }
              if (pageNumber === 2) {
                if (id >= 10) {
                  return (
                    <Link
                      key={id}
                      to={`/products/singleproduct/${id}`}
                      className="col"
                      style={{ textDecoration: "none" }}
                    >
                      <div className="card" style={{ marginInline: "auto" }}>
                        <div className="card-img">
                          <img className="img-fluid" src={img} alt={name} />
                        </div>
                        <div className="card-body text-center">
                          <h3>{name}</h3>
                          <p>${price}</p>
                        </div>
                      </div>
                    </Link>
                  );
                }
              }
            })}
          </div>
          <div className="nxt-btns pe-3 mb-3">
            <button onClick={() => setPageNumber(1)} className="prev">
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <button onClick={() => setPageNumber(2)} className="next">
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;

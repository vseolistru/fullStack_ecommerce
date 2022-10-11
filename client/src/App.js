import data from "./data";

function App() {
  return (
    <div className="App">
      <header>
            <a href="/">New Store</a>
      </header>
        <main>
            <h1>Feature Products</h1>
            <div className="products">
                {
                    data.products.map(prod =>
                        <div className="product" key={prod.id}>
                            <a href={`/product/${prod.slug}`}>
                            <img src={prod.image} alt={prod.name}/>
                            <div className="product-item">
                                <p>{prod.name}</p>
                                <p><strong>{prod.price}p.</strong></p>
                            </div>
                            </a>
                        </div>
                    )
                }
            </div>
        </main>
    </div>
  );
}

export default App;

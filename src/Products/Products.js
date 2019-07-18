import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './Products.scss'
import fakeProductsData from './fakeProductsData.json'

const formatName = (name) => name.replace('&amp;', '&')
const toSlug = (name) => `#${name.toLowerCase().replace(' ', '-')}`;


const mapProduct = (product) => ({
  id: product.product_id,
  name: product.name,
  price: product.cheapest_price,
  image: product.url
})

const filterProductsByCategory = (category) =>
  fakeProductsData['product-catalog']
    .find(c => c.name === category)
    .items
    .reduce((res, i) => {
      if (i.type === 'product') {
        res.push(mapProduct(i))
      } else if (i.type === 'category') {
        i.items
          .filter(i => i.type === 'product')
          .forEach(i => res.push(mapProduct(i)))
      }

      return res
    }, [])

export const Products = () => {
  const [selectedCategory, selectCategory] = useState('All');

  return (
    <div className='products-container' >
      <nav className='nav nav-pills flex-column flex-sm-row'>
        {
          fakeProductsData['product-catalog']
            .filter(i => i.type === 'category')
            .reverse()
            .map(c => (
              <a key={c.name}
                 className={'flex-sm-fill text-sm-center nav-link' +
                 (c.name === selectedCategory ? ' active' : '')}
                 onClick={() => selectCategory(c.name)}
                 href={toSlug(c.name)}>
                {formatName(c.name)}
              </a>
            ))
        }
      </nav>
      <hr />
      <div className="main-block">
        {
          fakeProductsData['product-catalog']
            .map(i => filterProductsByCategory(i.name)
              .map(a => (
                <div className="product-card" key={a.image}>
                    <a href="#" style={{backgroundImage: `url(${a.image})`}} className="product-img">
                       <div className="hover">
                        <div className="hover-upper">
                          Product details
                        </div>
                        <div className="hover-lower">
                          Pick this
                        </div>
                        <div style={{backgroundImage: `url(${a.image})`}} className="product-img-display">
                        </div>
                      </div>
                    </a>

                  <div className="text" key={a.name}>
                    <p className="product-name" key={a.id}>{a.name}</p>
                    <p className="product-price" key={a.price}>STARTING AT {a.price}</p>
                  </div>
                </div>
              )
            ))
        }
      </div>
    </div>
  )

}

export default Products

{/*TODO: Replace with responsive products grid*/}
{/*<pre dangerouslySetInnerHTML={{__html: JSON.stringify(filterProductsByCategory(selectedCategory), null, 2) }}>*/}
{/*</pre>*/}

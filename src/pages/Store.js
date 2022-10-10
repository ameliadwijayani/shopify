import React, { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import Img from "gatsby-image"
import {graphql,Link} from "gatsby"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { GatsbyImage } from "gatsby-plugin-image"

import { useFlexSearch } from 'react-use-flexsearch';

let stripePromise
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe("pk_test_51L0Zk4A7C8rU4XCnfZEY5yGnJDujOdY2CxQkSHUbAE22YPCcpmYLc3HOQHpkriiba6USkmNHyLrivD57tzFG3Aay00f3s7NEgp")
  }
  return stripePromise
}

export default function Store({ data: {
    localSearchPages: { index, store },
    allShopifyProduct: { edges },
},}) {
    const unFlattenResults = results =>{
        results!=[]&&results.map(post => {
            const {title,description,totalInventory,amount} = post;
            return { edges: { title,description,totalInventory,amount } };
        });
        return results;
    }
    
    
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s')
    const [searchQuery, setSearchQuery] = React.useState(query || '');

    // console.log(JSON.parse(index))
    const results = useFlexSearch(searchQuery, index, store);
    const posts = searchQuery ? unFlattenResults(results) : edges;


    function header_store(){
        return(
            <div id="breadcrumb" className="section">
            {/* container */}
            <div className="container">
                {/* row */}
                <div className="row">
                <div className="col-md-12">
                    <ul className="breadcrumb-tree">
                   
                    </ul>
                </div>
                </div>
                {/* /row */}
            </div>
            {/* /container */}
            </div>

        )
    }
    function categories(){
        return(
        <div className="section">
        {/* container */}
        <div className="container">
            {/* row */}
            <div className="row">
            <div id="store" className="col-md-9">
                {/* store products */}
                <div className="row">
                    {/* product */}
                    {posts.map((e,index)=>{
                        return(
                            <div className="col-md-4 col-xs-6" key={index}>
                                <div className="product">
                                    <div className="product-img">
                                        <GatsbyImage image={e.node.featuredMedia.preview.image?.gatsbyImageData}  />
                                        <div className="product-label">
                                        
                                        </div>
                                    </div>
                                    <div className="product-body">
                                        <p className="product-category">Category</p>
                                        
                                        <h3 className="product-name"><Link to={`/${e.node.id}`}>{e.node.title}</Link></h3>

                                        <h4 className="product-price">Rp {e.node.priceRangeV2.maxVariantPrice.amount}</h4>
                                        <div className="product-rating">
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        </div>
                                    </div>
                                    <div className="add-to-cart">
                                        <button className="add-to-cart-btn" onClick={()=>{}}><i className="fa fa-shopping-cart" /> add to cart</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                {/* /product */}
                </div>
                {/* /store products */}
                {/* store bottom filter */}
                <div className="store-filter clearfix">
                {/* <ul className="store-pagination">
                    <li className="active">1</li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#"><i className="fa fa-angle-right" /></a></li>
                </ul> */}
                </div>
                {/* /store bottom filter */}
            </div>
            {/* /STORE */}
            </div>
            {/* /row */}
        </div>
        {/* /container */}
        </div>

        )
    }
    return (
        <div>
            <Header
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                searchData={{  }}
            />
                { header_store()}
                { categories()}
            <Footer/>
        </div>
    )
}

export const query = graphql`
    query {
        localSearchPages {
            store
            index
        }
        allShopifyProduct {
            edges {
              node {
                id
                title
                priceRangeV2 {
                  maxVariantPrice {
                    amount
                  }
                }
                description
                featuredMedia {
                  preview {
                    image {
                      gatsbyImageData
                    }
                  }
                }
                totalInventory
              }
            }
        }
    }
`



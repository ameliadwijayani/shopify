import React from 'react'
import styled from '@emotion/styled'

import Layout from "../components/Layout"
import { getProfile,Logout } from "../utils/auth"
import Img from "gatsby-image"
import { loadStripe } from "@stripe/stripe-js"
import { CartProvider } from "use-shopping-cart"
export default function Checkout() {

    const user = getProfile()
    let totHarga=0;
    const [loading, setLoading] = React.useState(false)
    /* Gets the totalPrice and a method for redirecting to stripe */

    function address(){
        return(
            <div className="section">
            {/* container */}
            <div className="container">
                
                {/* Order Details */}
                <div className="col-md-5 order-details">
                    <div className="section-title text-center">
                    <h3 className="title">Your Order</h3>
                    </div>
                    <div className="order-summary">
                    <div className="order-col">
                        <div><strong>PRODUCT</strong></div>
                        <div><strong>TOTAL</strong></div>
                    </div>
                    <div className="order-products">
                    {user["cart"]!=undefined&&user["cart"].map((e,index)=>{
                        totHarga+=(parseInt(e.harga)*e.qty)
                        console.log(e)
                        return(
                            <div>
                                <div className="order-col">
                                    <div>{e.qty+"x "+e.nama}</div>
                                    <div>{"Rp. "+parseInt(e.harga).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
                                </div>
                            </div>
                        )
                    })}
                        
                    </div>
                    <div className="order-col">
                        <div>Shiping</div>
                        <div><strong>FREE</strong></div>
                    </div>
                    <div className="order-col">
                        <div><strong>TOTAL</strong></div>
                        <div><span className="order-total" style={{ fontSize:"14pt" }}>{"Rp. "+totHarga.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span></div>
                    </div>
                    </div>
                    <div className="input-checkbox">
                    <input type="checkbox" id="terms" />
                    <label htmlFor="terms">
                        <span />
                        I've read and accept the <a href="#">terms &amp; conditions</a>
                    </label>
                    </div>
                    {/* <a href="#" className="primary-btn order-submit">Place order</a> */}
                    <button
                        // style={buttonStyles}
                        disabled={loading}
                        onClick={() => {
                        setLoading(true)
                        }}
                    >
                        {loading ? "Loading..." : "Checkout"}
                    </button>
                </div>
                {/* /Order Details */}
                </div>
            {/* /container */}
            </div>

        )
    }
  return (
    <Layout>
        {address()}
    </Layout>
  )
}

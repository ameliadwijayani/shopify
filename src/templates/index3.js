import React from 'react'
import Layout from "../components/Layout"
import { StaticImage } from "gatsby-plugin-image"
import styled from '@emotion/styled'
import {graphql} from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Img from "gatsby-image"
import { setItem } from "../utils/auth"
// import { useShoppingCart, formatCurrencyString } from "use-shopping-cart"


export default function Product({data}) {
    console.log(data.markdownRemark)
    return (
        <Layout>
            <div className="container-fluid py-3">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-8">
                        {/* News Detail Start */}
                        <div className="position-relative mb-3">
                        <div className="overlay position-relative bg-light">
                            <div className="mb-3">
                            Durasi Waktu : {data.markdownRemark?.fields.readingTime.text}
                            {/* <span className="px-1">/</span>
                            <span className="px-1">/</span> */}
                            <br></br>   
                              <span>{data.markdownRemark?.timeToRead} Kali Dibaca</span>
                            </div>
                            <div>
                                {data.markdownRemark?.frontmatter.deskripsi}
                            </div>
                        </div>
                        </div>
                        
                    </div>
                    
                    </div>
                </div>
            </div>

        </Layout>
    )
}


export const query = graphql`
    query($id: String!) {
        markdownRemark( id: { eq: $id} ) {
            timeToRead
            excerpt
            fields {
                id
                readingTime {
                  text
                }
            }
            frontmatter {
                deskripsi
                title
            }
        }
    }
`


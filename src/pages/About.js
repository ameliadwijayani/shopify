import React from 'react'
import Layout from "../components/Layout"
import {graphql} from "gatsby"

export default function About({data}) {
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
                            Durasi Waktu : {data.allMarkdownRemark.nodes[0].fields.readingTime.text}
                            {/* <span className="px-1">/</span>
                            <span className="px-1">/</span> */}
                            <br></br>   
                              <span>{data.allMarkdownRemark.nodes[0].timeToRead} Kali Dibaca</span>
                            </div>
                            <div>
                                {data.allMarkdownRemark.nodes[0].frontmatter.deskripsi}
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
    query {
        allMarkdownRemark {
          nodes{
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
            id
          }
        }
    }
`


import { useState } from "react";

import "./SellitemPage.css"

export function SellitemPage() {
    return (
        <>
          <div className="SellitemPage"></div>
          <div className="hero-1">
            <h1 className="hero-1-heading">List an item</h1>
            <p className="hero-1-text">
                Share your items with the Bruin community and make some extra cash! Just fill out the form below to get started.
            </p>
            <div className="SellitemForm">
                <div className="PhotoArea">
                    <p className="Photo-text">Add up to 5 photos of the item</p>
                    
                </div>
            </div>
          </div>
        </>
    );
}
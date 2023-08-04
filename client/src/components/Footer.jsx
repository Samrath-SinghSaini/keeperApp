import React from "react";

function Footer(){
    return <div className="footer-container">
        <p className="foot">Made by Samrath</p>
        <p className="foot">{new Date().getFullYear()}</p>
    </div>
}

export default Footer
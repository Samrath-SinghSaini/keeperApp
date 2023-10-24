import React from "react";

function Footer(){
    return <div className="footer-container">
        <p className="foot">Made using React, Express, NodeJS and MongoDb</p>
        <p className="foot">{new Date().getFullYear()}</p>
    </div>
}

export default Footer
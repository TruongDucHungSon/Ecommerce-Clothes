import React, { useState } from "react";
import { FooterList } from "./Footer/constant";
import Collapse from "./primitive/Collapse";

const Footer = () => {
  const [currentCollapseActive, setCurrentCollapseActive] = useState(-1);

  return (
    <>
      <footer className="footer ">
        <div className="footer-group ">
          <div className="footer-row container">
            {FooterList.map((item, index) => (
              <div className="footer-box" key={`footer-box-${index}`}>
                <Collapse
                  heading={item.heading}
                  open={index === currentCollapseActive ? true : false}
                  onClick={() => {
                    if (index === currentCollapseActive)
                      setCurrentCollapseActive(-1);
                    else setCurrentCollapseActive(index);
                  }}
                >
                  {/* Foot Navagation item */}
                  {item.collapse.map((collapse, index) => (
                    <Collapse.Item
                      route={collapse.route}
                      key={`collapse-item-${index}-${collapse.label}`}
                    >
                      {collapse.label}
                    </Collapse.Item>
                  ))}
                </Collapse>
              </div>
            ))}
          </div>
        </div>
      </footer>
      <div className="footer-end">
        <p>202x © Anup, All Rights Reserved</p>
      </div>
    </>
  );
};

export default Footer;

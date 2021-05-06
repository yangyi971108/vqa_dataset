import React, { Component, useEffect, useRef, useState } from 'react';
import { Layout, Divider } from 'antd';
import classes from '.././index.module.css';
import { FilePdfOutlined } from '@ant-design/icons';
import { createBrowserHistory } from 'history';
import { useHistory, Switch, Route, useLocation } from 'react-router-dom';
function HomePage () {
  // 页面布局相关
  const { Header, Content, Footer, Sider } = Layout;
  const navArr = ['TOP', 'ABOUT', 'PAPER', 'DATASET', 'EXAMPLES'];
  const [currentId, setCurrentId] = useState(0);
  // 页面插入的图片
  const logoImg = require('../../assets/logo.png');
  const bgImg = require('../../assets/bg4.png');
  const AboutImg = require('../../assets/About.jpg');
  const Ex1Img = require('../../assets/Examples1.png');
  const Ex2Img = require('../../assets/Examples2.png');
  const history = useHistory();
  window.onscroll = () => {
    // 获取当前滚动条的位置
    var top = document.documentElement.scrollTop;
    var currentId;
    for (var i = 1; i <= 4; i++) {
      var idName = 'nav-' + i;
      var navElem = document.getElementById(idName);
      if (navElem) {
        var itemTop = navElem.offsetTop;
        // 当前元素顶部相对于指定元素顶部的偏移
        if (top > itemTop - 50) {
          currentId = i;
        } else {
          break;
        }
      }


    }
    setCurrentId(currentId);
  }




  //实现点击导航跳转到指定位置
  var scrollToAnchor = (anchorId) => {
    if (anchorId) {   // 找到锚点 id
      let anchorElement = document.getElementById(anchorId);
      if (anchorElement) {        // 如果对应id的锚点存在，就跳转到锚点
        anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }
    }
  }

  // 动态控制导航栏的位置
  window.addEventListener('scroll', function () {
    let t = document.documentElement.scrollTop;
    let element = document.getElementById('menu');
    if (element) {
      if (t > 288) {
        element.style.position = 'fixed';
        element.style.top = '62px';
        element.style.left = '50px';

      } else {
        element.style.position = 'absolute';
        element.style.top = '350px';
        element.style.left = '50px';

      }
    }
  })


  const content = (
    <div className="home-con">
      <div className="main-con">
        <div className="section" id="nav-0" style={{height:'200px'}}>
          <img className={classes.bgImg} src={bgImg} />
          <span className={classes.dataText} >Computer Science Diagrams QA</span>
          <span className={classes.datah2Text}>Diagram parsing and corresponding question answering</span>
        </div>
       
        <div  className="center-con" id="center-con" style={{ position: 'absolute', left: '15%', top: '320px', backgroundColor: 'white',width:'70%' }}>
          <div className="section" id="nav-1" >
            <h2 style={{ color: 'darkgrey', position: 'absolute', left: '4%', top: '2%' }}>Computer Science Diagrams QA (CSDQA)</h2>
            <div style={{ color: 'darkgrey', position: 'absolute', left: '4%', top: '6%' }}> Computer Science Diagrams QA（CSDQA） is a computer science domain dataset with rich annotations supervision. It contains a total of 1,294 diagrams in 12 categories from five undergraduate courses: *Data structure*, *Principles of Computer Networks*, *Computer Architecture*, *Digital Logic Circuit*, and *Computer Operating System*. The CSDQA dataset is designed to evaluate algorithms on the tasks of object detection and  question answering in the geometric shapes diagrams scenario. Diagrams in CSDQA come from textbooks, blogs, encyclopedias and other educational resources. The annotations are completed by trained domain experts with plenty of time.</div>
            <Divider style={{ borderWidth: 1, borderColor: 'darkgrey',position: 'absolute',  top: '19%' }} />
          </div>
          {/* <div className="section" id="nav-2">
            <h2 style={{ color: 'darkgrey', position: 'absolute', left: '4%', top: '30%' }}>
              Paper
            </h2>
            <div>
              <img style={{ width: '190px', height: '143px', marginTop: 70, marginBottom: 50, float: 'left' }} src={AboutImg}></img>
              <h3 style={{ marginTop: 90, marginRight: 100, float: 'right' }}>RL-CSDia: Representation Learning of Computer Science Diagrams</h3>
              <h4>Shaowei Wang, Lingling Zhang, Xuan Luo, Xin Hu, Yi Yang, Jun Liu</h4>
              <FilePdfOutlined style={{ fontSize: 20, position: 'relative', top: '15px' }} onClick={() => {
                history.push('/pdf')
              }} />



            </div>
            <Divider style={{ borderWidth: 1, borderColor: 'darkgrey' }} />
          </div>
          <div className="section" id="nav-3"><img src={logoImg} /></div>
          <div className="section" id="nav-4"><img src={logoImg} /></div> */}
        </div>
      </div>

      <div className={classes.nav_con} id="menu" >
        {navArr.map((item, index) =>
          currentId === index ? (
            <p>
              <li className="nav-item" style={{ color: 'blue', position: 'relative', left: -20 }} onClick={scrollToAnchor.bind(this, 'nav-' + index)}>{item}</li>
            </p>
          ) : (
            <p>
              <a className="nav-item" onClick={scrollToAnchor.bind(this, 'nav-' + index)}>{item}</a>
            </p>
          )
        )}

      </div>
    </div>
  )
  return (
    <Layout className={classes.layout}>
      <Header className={classes.header}>
        <div style={{ position: 'relative', top: 5 }}>
          <img className={classes.logoImg} src={logoImg} />
          <span className={classes.headText}>Institute of Multimedia Knowledge Fusion and Engineering</span>
        </div>
      </Header>
      <Content>

        {content}
      </Content>
      <Footer className={classes.footer}>Copyright © 2021 跨媒体智能融合与工程应用研究所. All rights reserved.</Footer>
    </Layout>
  );
}

export default HomePage;


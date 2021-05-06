import React, { Component, useEffect, useRef, useState } from 'react';
import { Layout, Divider,Row,Col,Slider,Card,Typography,Table  } from 'antd';
import classes from '.././index.module.css';
import { FilePdfOutlined } from '@ant-design/icons';
import { createBrowserHistory } from 'history';
import { useHistory, Switch, Route, useLocation } from 'react-router-dom';
import Title from 'antd/lib/skeleton/Title';
import Paragraph from 'antd/lib/skeleton/Paragraph';

function HomePage () {
  // 页面布局相关
  const { Header, Content, Footer, Sider } = Layout;
  const navArr = ['TOP', 'ABOUT', 'PAPER', 'STATISTICS', 'EXAMPLES'];
  const [currentId, setCurrentId] = useState(0);
  // 页面插入的图片
  const logoImg = require('../../assets/logo.png');
  const bgImg = require('../../assets/bg4.png');
  const AboutImg = require('../../assets/object_detection_example.png');
  const wholeImg = require('../../assets/whole_dataset.png');
  const vqaImg = require('../../assets/vqa_dataset.png');

  const history = useHistory();
  const { Title, Paragraph, Text } = Typography;
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

  const onmouseOver = (e)=>{
      e.target.style.color = 'blue';
  }

 const onmouseout = (e)=>{
   e.target.style.color = '#000000';
 }
  const content = (
    <div className="home-con">
      <div className="main-con">
        <div className="section" id="nav-0" style={{height:'200px'}}>
          <img className={classes.bgImg} src={bgImg} />
          <span className={classes.dataText} >Computer Science Diagrams QA</span>
          <span className={classes.datah2Text}>Diagram parsing and corresponding question answering</span>
        </div>
       
        <div  className="center-con" id="center-con" style={{ position: 'absolute', left: '20%', top: '320px', backgroundColor: 'white',width:'60%'}}>
             <div className="section" id="nav-1" style={{position:'relative',top:40,left:40}} >
                    <h2 style={{color:'darkgrey',fontSize:'1.5rem'}}>Computer Science Diagrams QA（CSDQA）</h2>
                    <div style={{width:'90%',margin:0,fontSize:'1.2rem',top:'0.8rem',position:'relative',lineHeight:2, textAlign: 'justify'}}>
                <strong> Computer Science Diagrams QA（CSDQA）</strong>is a computer science domain dataset with rich annotations supervision. It contains a total of 1,294 diagrams in 12 categories from five undergraduate courses: <i>Data structure</i>, <i>Principles of Computer Networks</i>, <i>Computer Architecture</i>, <i>Digital Logic Circuit</i>, and <i>Computer Operating System</i>. The CSDQA dataset is designed to evaluate algorithms on the tasks of object detection and  question answering in the geometric shapes diagrams scenario. Diagrams in CSDQA come from textbooks, blogs, encyclopedias and other educational resources. The annotations are completed by trained domain experts with plenty of time.
                    </div>
            </div>      
            <Divider style={{ position: 'relative',  top: '3.5rem' }} />
            <div className="section" id="nav-2" >
                <h2 style={{color:'darkgrey',fontSize:'1.5rem',top:40,left:40,position:'relative'}}>Paper</h2>
                <Row justify="center" align="center" style={{position:'relative',top:'3.5rem'}} >
                    <Col span={4}>
                        <img style={{width: '10rem', height: '8rem'}} src={AboutImg}/>
                    </Col>
                    <Col span={12} offset={2}>
                        <h3 onMouseOver={onmouseOver} onMouseOut={onmouseout} onClick={() => {
                        history.push('/pdf')
                    }}>RL-CSDia: Representation Learning of Computer Science Diagrams</h3>
                        <h4>Shaowei Wang, Lingling Zhang, Xuan Luo, Xin Hu, Yi Yang, Jun Liu</h4>
                        <FilePdfOutlined style={{ fontSize: 20}} onClick={() => {
                        history.push('/pdf')
                    }} />
                    </Col>
                </Row>
            </div>
            <Divider style={{ position: 'relative',  top: '4.5rem' }} />
            <div className="section" id="nav-3" >
                <h2 style={{color:'darkgrey',fontSize:'1.5rem',top:60,left:40,position:'relative'}}>CSDQA STATISTICS</h2>
                <div className={classes.wrap}>
                <div className={classes.table_wrap}>
                <table className={classes.table}>
                    <tbody>
                    <tr style={{backgroundColor:'rgba(220,220,220,0.5)'}}>
                        <th className={classes.table_title}>Diagrams</th>
                        <td className={classes.table_content}>1294</td>
                    </tr>
                    <tr>
                        <th className={classes.table_title}>Objects</th>
                        <td className={classes.table_content}>11776</td>
                    </tr>
                    <tr style={{backgroundColor:'rgba(220,220,220,0.5)'}}>
                        <th className={classes.table_title}>Relations</th>
                        <td className={classes.table_content}>5675</td>
                    </tr>
                    <tr >
                        <th className={classes.table_title}>Questions</th>
                        <td className={classes.table_content}>2894</td>
                    </tr>
                    <tr style={{backgroundColor:'rgba(220,220,220,0.5)'}}>
                        <th className={classes.table_title}>Annotations</th>
                        <td className={classes.table_content}>>30000</td>
                    </tr>
                    </tbody>
                </table>
                </div>
                </div>
                
            </div>
            <Divider style={{ position: 'relative',  top: '6.5rem' }} />
            <div className="section" id="nav-4" >
              <h2 style={{color:'darkgrey',fontSize:'1.5rem',top:'6rem',left:40,position:'relative'}}>EXAMPLES</h2>
              <div className={classes.examples}>
              <img src={wholeImg} style={{width:'70%',height:'73.5%',left: '15%',position:'relative'}}/>
              <h3 style={{display:'flex',alignItems:'center',justifyContent:'center',position:'relative',top:'2rem'}}>All Categories In The Dataset</h3>
              <Divider style={{ position: 'relative',  top: '3.5rem' }} />
              <img src={AboutImg} style={{width:'70%',height:'156%',left: '15%',position:'relative',top:'5rem'}}/>
              <h3 style={{display:'flex',alignItems:'center',justifyContent:'center',position:'relative',top:'8rem'}}>Object Detection Example</h3>
              <Divider style={{ position: 'relative',  top: '10rem' }} />
              <img src={vqaImg} style={{width:'70%',height:'152%',left: '15%',position:'relative',top:'12rem'}}/>
              <h3 style={{display:'flex',alignItems:'center',justifyContent:'center',position:'relative',top:'14rem'}}>VQA Example</h3>
              <Divider style={{ position: 'relative',  top: '15rem' }} />
              </div>
            </div>
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


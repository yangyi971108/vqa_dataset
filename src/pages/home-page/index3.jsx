import React, { useRef, useState } from 'react';
import { Layout, Divider, Row, Col, Slider, Card, Typography, Table } from 'antd';
import classes from '.././index.module.css';
import { FilePdfOutlined } from '@ant-design/icons';

import { useHistory, Switch, Route, useLocation } from 'react-router-dom';


function HomePage () {
  // 页面布局相关
  const { Header, Content, Footer, Sider } = Layout;
  const navArr = ['TOP', 'ABOUT', 'PAPER', 'STATISTICS', 'EXAMPLES', 'CONTACT'];
  const [currentId, setCurrentId] = useState(0);
  // 页面插入的图片
  const xjtuImg = require("../../assets/bianlogo.jpg");
  const logoImg = require('../../assets/logo.png');
  const bgImg = require('../../assets/bg4.png');
  const AboutImg = require('../../assets/object_detection_example.png');
  const wholeImg = require('../../assets/whole_dataset.png');
  const vqaImg = require('../../assets/vqa_dataset.png');
  const AnnotationImg = require('../../assets/annotation.png');
  const vqadataset = require('../../assets/ImageSets.zip');
  const history = useHistory();
  const pdfFile = require('../../assets/IEEEtrans.pdf');

  window.onscroll = () => {
    // 获取当前滚动条的位置
    var top = document.documentElement.scrollTop;

    var currentId;
    for (var i = 1; i <= 5; i++) {
      var idName = 'nav-' + i;
      var beforeName = 'nav-' + (i - 1);
      var navElem = document.getElementById(idName);
      var beforeElem = document.getElementById(beforeName);
      var chaju = 0;
      if (navElem) {
        // var itemTop = navElem.offsetTop;
        // var height = beforeElem.offsetHeight;
        // console.log('itemTop,height,top',itemTop,height,top)
        // // 当前元素顶部相对于指定元素顶部的偏移
        // if (itemTop + height - top < 200 || top - itemTop - height  > 200) {
        //   currentId = i;
        // } 
        var itemTop = navElem.offsetTop;
        // 当前元素顶部相对于指定元素顶部的偏移
        console.log('itemTop,top', top - itemTop)
        chaju = top - itemTop;
        if (top > itemTop - 50) {
          currentId = i;
        }
        else {
          break;
        }
      }
    }

    console.log('currentId', currentId);
    setCurrentId(currentId);
  }




  //实现点击导航跳转到指定位置
  var scrollToAnchor = (anchorId) => {
    if (anchorId) {   // 找到锚点 id
      let anchorElement = document.getElementById(anchorId);

      anchorId = anchorId.charAt(anchorId.length - 1);
      setCurrentId(currentId);

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
        element.style.top = '112px';
        element.style.left = '125px';

      } else {
        element.style.position = 'absolute';
        element.style.top = '400px';
        element.style.left = '125px';

      }
    }
  })

  const onmouseOver = (e) => {
    e.target.style.color = 'blue';
  }

  const onmouseout = (e) => {
    e.target.style.color = '#000000';
  }

  return (
    <div>
      <div className={classes.header}>
        <img className={classes.logoImg} src={logoImg} />
        <span className={classes.headText}>Institute of Multimedia Knowledge Fusion and Engineering</span>
      </div>
      <div className={classes.content}>
        <div className="home-con">
          <div className="main-con">
            <div className="section" id="nav-0" style={{ height: '200px' }}>
              <img className={classes.bgImg} src={bgImg} />
              <span className={classes.dataText} >Computer Science Diagrams Question Answering</span>
              {/* <span className={classes.datah2Text}>Diagram parsing and corresponding question answering</span> */}
            </div>
            <div className="center-con" id="center-con" style={{ position: 'absolute', left: '20%', top: '320px', backgroundColor: 'white', width: '60%' }}>
              <div className="section" id="nav-1" style={{ position: 'relative', top: 40, left: 40 }} >
                <h2 style={{ color: 'darkgrey', fontSize: '1.5rem', }}>Computer Science Diagrams QA（CSDQA）</h2>
                <img src={wholeImg} className={classes.wholeImg} />
                <div style={{ width: '90%', margin: 0, fontSize: '18px', top: '2.8rem', position: 'relative', lineHeight: 1.5, textAlign: 'justify' }}>
                  <strong> Computer Science Diagrams QA（CSDQA）</strong>is a computer science domain dataset with rich annotations supervision. It contains a total of 1,294 diagrams in 12 categories from five undergraduate courses: <i>Data structure</i>, <i>Principles of Computer Networks</i>, <i>Computer Architecture</i>, <i>Digital Logic Circuit</i>, and <i>Computer Operating System</i>. The CSDQA dataset is designed to evaluate algorithms on the tasks of object detection and  question answering in the geometric shapes diagrams scenario. Diagrams in CSDQA come from textbooks, blogs, encyclopedias and other educational resources. The annotations are completed by trained domain experts with plenty of time.
                </div>
                <Divider style={{ position: 'relative', top: '2rem' }} />
              </div>



              <div className="section" id="nav-3" >
                <h2 style={{ color: 'darkgrey', fontSize: '1.5rem', top: 60, left: 40, position: 'relative' }}>CSDQA STATISTICS</h2>
                <div className={classes.wrap}>
                  <div className={classes.table_wrap}>
                    <table className={classes.table}>
                      <tbody>
                        <tr style={{ backgroundColor: 'rgba(220,220,220,0.5)' }}>
                          <th className={classes.table_title}>Diagrams</th>
                          <td className={classes.table_content}>1294</td>
                        </tr>
                        <tr>
                          <th className={classes.table_title}>Objects</th>
                          <td className={classes.table_content}>11776</td>
                        </tr>
                        <tr style={{ backgroundColor: 'rgba(220,220,220,0.5)' }}>
                          <th className={classes.table_title}>Relations</th>
                          <td className={classes.table_content}>5675</td>
                        </tr>
                        <tr>
                          <th className={classes.table_title}>Questions</th>
                          <td className={classes.table_content}>2894</td>
                        </tr>
                        <tr style={{ backgroundColor: 'rgba(220,220,220,0.5)' }}>
                          <th className={classes.table_title}>Annotations</th>
                          <td className={classes.table_content}>>30000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <a href={vqadataset} style={{ width: 100, height: 100 }} download="CSDQA">
                  <Row justify="center" align="center" style={{ position: 'relative', top: '6.5rem' }} >
                    <Col span={2}>
                      <svg >
                        <path d="M30.8,28.4h-0.5v1.4h0.5c0.4,0,0.6-0.1,0.8-0.2s0.2-0.3,0.2-0.5c0-0.2-0.1-0.4-0.2-0.5C31.4,28.5,31.1,28.4,30.8,28.4z"></path>
                        <path d="M33.6,24v-6l-8.7-8.7H11.6c-1.1,0-3.2,0.7-3.2,3.3v24.9c0,1.1,0.7,3.3,3.2,3.3h18.8c1.1,0,3.2-0.7,3.2-3.3v-1.3 c1.5-0.2,2.6-1.4,2.6-3V27C36.3,25.4,35.1,24.2,33.6,24z M33,30.6c-0.4,0.4-1,0.5-1.7,0.5h-1.1v2.3h-1.9v-6.2h3.2 c0.7,0,1.2,0.2,1.6,0.5c0.3,0.3,0.5,0.8,0.5,1.4C33.6,29.7,33.4,30.2,33,30.6z M25.8,12.8l4.3,4.3h-2.9c-1.2,0-1.4-1-1.4-1.4V12.8z M30.4,38.8H11.6c-1.2,0-1.4-1-1.4-1.4V12.5c0-1.2,1-1.4,1.4-1.4h12.3v4.6c0,1.1,0.7,3.2,3.2,3.2h4.6v5H17.3c-1.7,0-3,1.3-3,3v6.2 c0,1.7,1.3,3,3,3h14.5v1.3C31.7,38.7,30.8,38.8,30.4,38.8z M26.7,27.2v6.2h-1.9v-6.2H26.7z M17.6,28.5v-1.3H23v1.2l-3.5,3.6h3.6 v1.3h-5.9v-1.3l3.5-3.6H17.6z"></path>
                      </svg>
                    </Col>
                    <Col span={14} style={{ position: 'relative', top: '1rem', left: '1rem' }}>
                      <span style={{ color: 'gray', fontWeight: 'bold', fontSize: '1rem' }}>
                        Download CSDQA - All Images, Questions, and Annotations
                                      </span>
                    </Col>
                  </Row>
                </a>
              </div>
              <Divider style={{ position: 'relative', top: '1.5rem' }} />
              <div className="section" id="nav-4" >
                <h2 style={{ color: 'darkgrey', fontSize: '1.5rem', top: '1rem', left: 40, position: 'relative' }}>EXAMPLES</h2>
                <div className={classes.examples}>

                  <h3 style={{ fontSize: '1.25rem', position: 'relative', left: '3.5%', width: '14rem', backgroundColor: 'rgba(220,220,220,0.7)', display: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', top: '-0.5rem' }}>Annotation Example</h3>
                  <img src={AnnotationImg} className={classes.AnnotationImg} />
                  <div style={{ position: 'relative', top: '3rem', fontSize: '1.2rem', lineHeight: 2, textAlign: 'justify', width: '90%' }}>Example of an undirected graph diagram annotation in CSDQA. （a）Global attribute: Describe the relevant knowledge of the diagram in a macro view. (b) Object: Fine-grained annotation of objects included in the diagram. (c) Relation: Attach the relation between objects to logical symbols such as arrows and straight lines, including the relation of the triple type annotation.</div>
                  <Divider style={{ position: 'relative', top: '3rem' }} />



                  <h3 style={{ fontSize: '1.25rem', position: 'relative', left: '3.5%', width: '14rem', backgroundColor: 'rgba(220,220,220,0.7)', display: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', top: '4.5rem' }}>Object detection</h3>
                  <img src={AboutImg} className={classes.AboutImg} />
                  {/* <div style={{position:'relative',top:'9rem',fontSize:'1.2rem',lineHeight: 2, textAlign: 'justify',width:'90%'}}>The CSDQA dataset encourages work on the task of object detection task, which is the important basis for diagrams understanding.</div> */}
                  <div style={{ position: 'relative', top: '-30%', fontSize: '1.2rem', lineHeight: 2, textAlign: 'justify', width: '20rem', left: '55%' }}>The CSDQA dataset encourages work on the task of object detection task, which is the important basis for diagrams understanding.</div>

                  <Divider style={{ position: 'relative', top: '0rem' }} />

                  <h3 style={{ fontSize: '1.25rem', position: 'relative', left: '3.5%', width: '14rem', backgroundColor: 'rgba(220,220,220,0.7)', display: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', top: '1.5rem' }}>VQA</h3>
                  <img src={vqaImg} className={classes.vqaImg} />
                  <div style={{ position: 'relative', top: '8rem', fontSize: '1.2rem', lineHeight: 2, textAlign: 'justify', width: '90%' }}>The CSDQA dataset contains the knowledge units and question-and-answer pairs corresponding to the diagrams, which are used to conduct research related to DQA. Questions include true and false questions and multiple choice questions.</div>
                  <Divider style={{ position: 'relative', top: '8rem' }} />
                  <div className="section" id="nav-5">
                    <div className="section" id="nav-2" style={{ top: '3.5rem', position: 'relative' }} >
                      <h2 style={{ color: 'darkgrey', fontSize: '1.5rem', top: '0rem', left: 40, position: 'relative' }}>Paper</h2>
                      <Row justify="center" align="center" style={{ position: 'relative', top: '0.5rem' }} >
                        <Col span={4}>
                          <img style={{ width: '10rem', height: '8rem' }} src={AboutImg} />
                        </Col>
                        <Col span={12} offset={2}>
                          <h3 onMouseOver={onmouseOver} onMouseOut={onmouseout} onClick={() => {
                            history.push('/pdf')
                          }}>
                            RL-CSDia: Representation Learning of Computer Science Diagrams
                                 </h3>
                          <h4>Shaowei Wang, Lingling Zhang, Xuan Luo, Xin Hu, Yi Yang, Jun Liu</h4>
                          <a href={pdfFile} style={{ color: 'gray', fontWeight: 'bold', position: 'relative', top: '2rem' }}><FilePdfOutlined style={{ fontSize: 20 }} /><span style={{ position: 'relative', left: '2rem' }}>Download Paper</span></a>
                        </Col>
                      </Row>

                    </div>
                    <h2 style={{ color: 'darkgrey', fontSize: '1.5rem', top: '7rem', left: 40, position: 'relative' }}>CONTACT</h2>
                    <ul style={{ fontSize: '1.2rem', top: '7rem', left: 0, position: 'relative', lineHeight: 2 }}>
                      <li>Shaowei Wang <a href="mailto:wang97@stu.xjtu.edu.cn">wang97@stu.xjtu.edu.cn</a></li>
                      <li>Lingling <a href="mailto:Zhang zhanglling@xjtu.edu.cn">Zhang zhanglling@xjtu.edu.cn</a></li>
                    </ul>
                  </div>



                  <div style={{ width: '100%', height: '20rem' }}></div>

                  <div className={classes.footer}>Copyright © 2021 跨媒体智能融合与工程应用研究所. All rights reserved.</div>

                </div>
              </div>

            </div>
          </div>
          <div className={classes.nav_con} id="menu" >
            {navArr.map((item, index) =>
              currentId == index ? (
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
      </div>
    </div >
  );
}

export default HomePage;


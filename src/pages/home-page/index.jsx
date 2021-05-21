import React, { useRef, useState } from 'react';
import { Layout, Divider, Row, Col, Table, Slider, Card, Typography } from 'antd';
import classes from '.././index.module.css';
import { FilePdfOutlined } from '@ant-design/icons';

import { useHistory, Switch, Route, useLocation } from 'react-router-dom';

import { dataSource } from '../data/dataSource';
function HomePage () {
  // 页面布局相关
  const { Header, Content, Footer, Sider } = Layout;
  const navArr = ['TOP', 'ABOUT', 'PAPER', 'STATISTICS', 'EXAMPLES', 'CONTACT'];
  const [currentId, setCurrentId] = useState(0);
  // 页面插入的图片
  const logoImg = require('../../assets/logo.png');
  const bgImg = require('../../assets/bg4.png');
  const AboutImg = require('../../assets/ObjectDetection.png');
  const wholeImg = require('../../assets/Introduction.png');
  const vqaImg = require('../../assets/QA.png');
  const AnnotationImg = require('../../assets/annotation.png');
  const vqadataset = require('../../assets/CSDQA.rar');
  const history = useHistory();
  const pdfFile = require('../../assets/IEEEtrans.pdf');


  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Diagrams',
      dataIndex: 'diagrams',
      key: 'diagrams',
    },
    {
      title: 'Objects',
      dataIndex: 'objects',
      key: 'objects',
    },
    {
      title: 'Relations',
      dataIndex: 'relations',
      key: 'relations',
    },
    {
      title: 'Multiple choice',
      dataIndex: 'choice',
      key: 'choice',
    },
    {
      title: 'True or false',
      dataIndex: 'TF',
      key: 'TF',
    },
  ]

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
          <div className="main-con" >
            <div className="section" id="nav-0" className={classes.headbackground}>
              Computer Science Diagrams Question Answering
            </div>
            <div className="center-con" id="center-con" style={{ position: 'absolute', left: '20%', top: '320px', backgroundColor: 'white', width: '60%' }}>
              <div className="section" id="nav-1" style={{ position: 'relative', top: 40, left: 40 }} >
                <h2 style={{ color: 'darkgrey', fontSize: '1.5rem', color:'indigo'}}>Computer Science Diagrams QA (CSDQA)</h2>
                <img src={wholeImg} className={classes.wholeImg} />
                <div style={{ width: '90%', margin: 0, fontSize: '20px', top: '2.8rem', position: 'relative', lineHeight: 1.7, textAlign: 'justify' }}>
                   Computer Science Diagrams QA (CSDQA) is a computer science domain dataset with rich annotations supervision. It contains a total of 1,294 diagrams in 12 categories from five undergraduate courses: <i>Data structure</i>, <i>Principles of Computer Networks</i>, <i>Computer Architecture</i>, <i>Digital Logic Circuit</i>, and <i>Computer Operating System</i>. The CSDQA dataset is designed to evaluate algorithms on the tasks of object detection and  question answering in the geometric shapes diagrams scenario. Diagrams in CSDQA come from textbooks, blogs, encyclopedias and other educational resources. The annotations are completed by trained domain experts with plenty of time.
                </div>
                <Divider style={{ position: 'relative', top: '2rem' }} />
              </div>



              <div className="section" id="nav-2" >
                <h2 style={{ color: 'indigo', fontSize: '1.5rem', top: 60, left: 40, position: 'relative' }}>CSDQA STATISTICS</h2>
                <div className={classes.wrap}>
                  <div className={classes.table_wrap}>
                    <table className={classes.table}>
                      <tbody>
                        <tr style={{ borderTop: '1px solid black', borderBottom: '1px solid black' }}>
                          <th className={classes.table_title}>Category</th>
                          <th className={classes.table_title}>Diagrams</th>
                          <th className={classes.table_title}>Objects</th>
                          <th className={classes.table_title}>Relations</th>
                          <th className={classes.table_title}>Multiple choiced</th>
                          <th className={classes.table_title}>True-or-false</th>
                        </tr>
                        <tr>
                          <td className={classes.table_text}>Array list</td>
                          <td className={classes.table_text}>100</td>
                          <td className={classes.table_text}>583</td>
                          <td className={classes.table_text}>468</td>
                          <td className={classes.table_text}>100</td>
                          <td className={classes.table_text}>100</td>
                        </tr>
                        <tr>
                          <td className={classes.table_text}>Linked list</td>
                          <td className={classes.table_text}>74</td>
                          <td className={classes.table_text}>626</td>
                          <td className={classes.table_text}>375</td>
                          <td className={classes.table_text}>74</td>
                          <td className={classes.table_text}>74</td>
                        </tr>
                        <tr>
                          <td className={classes.table_text}>Binary tree</td>
                          <td className={classes.table_text}>150</td>
                          <td className={classes.table_text}>1323</td>
                          <td className={classes.table_text}>590</td>
                          <td className={classes.table_text}>150</td>
                          <td className={classes.table_text}>150</td>
                        </tr>
                        <tr>
                          <td className={classes.table_text}>Non-binary tree</td>
                          <td className={classes.table_text}>150</td>
                          <td className={classes.table_text}>1489</td>
                          <td className={classes.table_text}>651</td>
                          <td className={classes.table_text}>300</td>
                          <td className={classes.table_text}>300</td>
                        </tr>
                        <tr>
                          <td className={classes.table_text}>Queue</td>
                          <td className={classes.table_text}>150</td>
                          <td className={classes.table_text}>1261</td>
                          <td className={classes.table_text}>444</td>
                          <td className={classes.table_text}>303</td>
                          <td className={classes.table_text}>303</td>
                        </tr>
                        <tr>
                          <td className={classes.table_text}>Stack</td>
                          <td className={classes.table_text}>150</td>
                          <td className={classes.table_text}>540</td>
                          <td className={classes.table_text}>403</td>
                          <td className={classes.table_text}>300</td>
                          <td className={classes.table_text}>300</td>
                        </tr>
                        <tr>
                          <td className={classes.table_text}>Directed Graph</td>
                          <td className={classes.table_text}>71</td>
                          <td className={classes.table_text}>695</td>
                          <td className={classes.table_text}>377</td>
                          <td className={classes.table_text}>71</td>
                          <td className={classes.table_text}>70</td>
                        </tr>
                        <tr>
                          <td className={classes.table_text}>Undirected Graph</td>
                          <td className={classes.table_text}>79</td>
                          <td className={classes.table_text}>828</td>
                          <td className={classes.table_text}>437</td>
                          <td className={classes.table_text}>79</td>
                          <td className={classes.table_text}>79</td>
                        </tr>
                        <tr>
                          <td className={classes.table_text}>Deadlock</td>
                          <td className={classes.table_text}>100</td>
                          <td className={classes.table_text}>849</td>
                          <td className={classes.table_text}>423</td>
                          <td className={classes.table_text}>100</td>
                          <td className={classes.table_text}>100</td>
                        </tr>
                        <tr>
                          <td className={classes.table_text}>Flow chart</td>
                          <td className={classes.table_text}>100</td>
                          <td className={classes.table_text}>985</td>
                          <td className={classes.table_text}>458</td>
                          <td className={classes.table_text}>100</td>
                          <td className={classes.table_text}>100</td>
                        </tr>
                        <tr>
                          <td className={classes.table_text}>Logic circuit</td>
                          <td className={classes.table_text}>70</td>
                          <td className={classes.table_text}>913</td>
                          <td className={classes.table_text}>432</td>
                          <td className={classes.table_text}>70</td>
                          <td className={classes.table_text}>70</td>
                        </tr>
                        <tr>
                          <td className={classes.table_text}>Network topology</td>
                          <td className={classes.table_text}>100</td>
                          <td className={classes.table_text}>1593</td>
                          <td className={classes.table_text}>517</td>
                          <td className={classes.table_text}>100</td>
                          <td className={classes.table_text}>100</td>
                        </tr>
                        <tr style={{ borderTop: '1px solid black', borderBottom: '1px solid black' }}>
                          <td className={classes.table_text}>Total</td>
                          <td className={classes.table_text}>1294</td>
                          <td className={classes.table_text}>11716</td>
                          <td className={classes.table_text}>5675</td>
                          <td className={classes.table_text}>1747</td>
                          <td className={classes.table_text}>1747</td>
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
                      <span style={{ color: 'gray', fontWeight: 'bold', fontSize: '16px' }}>
                        Download CSDQA - All Images, Questions, and Annotations
                                      </span>
                    </Col>
                  </Row>
                </a>
              </div>
              
              
              <Divider style={{ position: 'relative'}} />

              <div className="section" id="nav-3" >
                <h2 style={{ color: 'indigo', fontSize: '1.5rem',  left: 40, position: 'relative' }}>EXAMPLES</h2>
                <div className={classes.examples}>

                  <h3 style={{ fontSize: '22px', position: 'relative', left: '3.5%', width: '14rem', backgroundColor: 'rgba(220,220,220,0.7)', display: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', top: '-2rem' }}>Annotation Example</h3>
                  <img src={AnnotationImg} className={classes.AnnotationImg} />
                  <div style={{ position: 'relative', top: '3rem', fontSize: '20px', lineHeight: 1.7, textAlign: 'justify', width: '90%' }}>Example of an undirected graph diagram annotation in CSDQA. (a)Global attribute: Describe the relevant knowledge of the diagram in a macro view. (b) Object: Fine-grained annotation of objects included in the diagram. (c) Relation: Attach the relation between objects to logical symbols such as arrows and straight lines, including the relation of the triple type annotation.</div>
                  <Divider style={{ position: 'relative', top: '3rem' }} />



                  <h3 style={{ fontSize: '22px', position: 'relative', left: '3.5%', width: '14rem', backgroundColor: 'rgba(220,220,220,0.7)', display: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', top: '3rem' }}>Object detection</h3>
                  <img src={AboutImg} className={classes.AboutImg} />
                  {/* <div style={{position:'relative',top:'9rem',fontSize:'1.2rem',lineHeight: 2, textAlign: 'justify',width:'90%'}}>The CSDQA dataset encourages work on the task of object detection task, which is the important basis for diagrams understanding.</div> */}
                  <div style={{ position: 'relative', top: '-40%', fontSize: '20px', lineHeight: 1.7, textAlign: 'justify', width: '20rem', left: '55%' }}>The CSDQA dataset encourages work on the task of object detection task, which is the important basis for diagrams understanding.</div>

                  <Divider style={{ position: 'relative', top: '-2rem' }} />

                  <h3 style={{ fontSize: '22px', position: 'relative', left: '3.5%', width: '14rem', backgroundColor: 'rgba(220,220,220,0.7)', display: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', top: '-2rem' }}>VQA</h3>
                  <img src={vqaImg} className={classes.vqaImg} />
                  <div style={{ position: 'relative', top: '3rem', fontSize: '20px', lineHeight: 1.7, textAlign: 'justify', width: '90%' }}>The CSDQA dataset contains the knowledge units and question-and-answer pairs corresponding to the diagrams, which are used to conduct research related to DQA. Questions include true and false questions and multiple choice questions.</div>
                  
                  
                  <Divider style={{ position: 'relative', top: '3rem' }} />
                  
                  
                  <div className="section" id="nav-4" style={{ top: '2.5rem', position: 'relative' }}>
                   
                      <h2 style={{ color: 'indigo', fontSize: '1.5rem', top: '0rem', left: 40, position: 'relative' }}>Paper</h2>
                     
                        
                         
                     
                          <div style={{fontSize:'20px',lineHeight:2}}>RL-CSDia: Representation Learning of Computer Science Diagrams</div>
                          <div style={{fontSize:'16px' , lineHeight:2}}>Shaowei Wang, Lingling Zhang, Xuan Luo, Xin Hu, Yi Yang, Jun Liu</div>
                          <a href={pdfFile} style={{ color: 'gray', fontWeight: 'bold', position: 'relative',lineHeight:2 }}><FilePdfOutlined style={{ fontSize: 16 ,lineHeight:3}} /><span style={{ position: 'relative', left: '2rem' }}>Download Paper</span></a>
                        
                        

                   
  
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


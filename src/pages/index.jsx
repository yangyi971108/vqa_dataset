import React, {Component,useEffect, useRef, useState} from 'react';
import { Layout} from 'antd';
import classes from './index.module.css';

function App() {
    const {Header, Content, Footer,Sider} = Layout;
    const logoImg = require('../assets/logo.png');
    const navArr = ['TOP','ABOUT','PAPER','DATASET','EXAMPLES'];
    const [currentId,setCurrentId] = useState(0);
    useEffect(()=>{
        /**
         * 获取当前位置
         */
        window.onscroll = ()=>{
            // 获取当前滚动条的位置
            var top = document.documentElement.scrollTop;
            var sections = document.getElementById("center-con").getElementsByClassName('section');
            // 存放当前位置的id,即顺序
            var currentId;
            for(var i = 0; i < sections.length; i++){
                var itemTop = sections[i].offestTop;
                // 当前元素顶部相对于指定元素顶部的偏移
                if(top > itemTop - 50){
                    currentId = i;
                }else{
                    break;
                }
            }
            setCurrentId(currentId);
        }
    } 
    )
    
    //实现点击导航跳转到指定位置
    var scrollToAnchor = (anchorId) => {
        if (anchorId) {   // 找到锚点 id
          let anchorElement = document.getElementById(anchorId);
          if(anchorElement) {        // 如果对应id的锚点存在，就跳转到锚点
            anchorElement.scrollIntoView({block: 'start', behavior: 'smooth'});
          }
        }
    }
   

    
    const content = (
        <div className="home-con" >
          <div className="main-con" style={{position:'absolute',left:'500px'}}>
            <div className="center-con" id="center-con">
              <div className="section" id="nav-0"><img src={logoImg} /></div>  
              <div className="section" id="nav-1"><img src={logoImg}/></div>
              <div className="section" id="nav-2"><img src={logoImg}/></div>
              <div className="section" id="nav-3"><img src={logoImg}/></div>
              <div className="section" id="nav-4"><img src={logoImg}/></div>
            </div>       
          </div>     

          <div className="nav-con" id="menu" > 
            {navArr.map((item,index)=>

                currentId === index?(
                    <a className="nav-item" style={{color:'blue'}}onClick={scrollToAnchor.bind(this,'nav-'+index)}>{item}</a>
                ):(
                    <a className="nav-item" onClick={scrollToAnchor.bind(this,'nav-'+index)}>{item}</a>
                )
            )}
         
          </div>
        </div>
      )
    return (
        <Layout className={classes.layout}>
            <Header className={classes.header}>
                <div style={{position:'relative',top:5}}>
                    <img className={classes.logoImg} src={logoImg} />
                    <span className={classes.headText}>Computer Science Diagrams</span>  
                </div>
            </Header>
            <Layout>
            <Sider className={classes.sider} >
                sider
            </Sider>
            <Content>
                {content}
            </Content>
            </Layout>
            <Footer className={classes.footer}>Copyright © 2021 跨媒体智能融合与工程应用研究所. All rights reserved.</Footer>
        </Layout>
    );
}

export default App;


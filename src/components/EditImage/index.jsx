// import React, { Component } from 'react';
// import scaleImage from './images/scale.png';
// import closeImage from './images/close.png';
// import maskImage from './images/mask.png';
// import { Button, message } from 'antd';

// class EidtImage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       bounder: 7,
//       image1: {
//         img: undefined,                                    // 保存图片对象
//         src: maskImage, // 图片路径;
//         x: 50,                                             // 图片左上角x坐标
//         y: 100,                                             // 图片左上角y坐标
//         width: 100,                                        // 用来绘制的宽度（注意不是图片自身的宽度，图片会被压缩显示）
//         height: 20,                                       // 用来绘制图片的高度
//         drag: false,                                       // 是否处于拖拽状态
//         scale: false,                                      // 是否处于缩放状态
//         scaleDirection: '',                                // 缩放方向
//         scaleIcon: scaleImage,
//         closeIcon: closeImage,
//         selected: true,                                     //拖拽模块是否处于选中转态，true为是
//         closeMoudle: false,                                   //true:关闭遮层，false展示遮层
//         imageUrl: ''                                          //画布背景图
//       },
//       imgUrl: '',
//       cansText: {},                                        //画布对象
//       canva: {},
//     }
//   }

//   componentDidMount = () => {
//     this.canvasInit();
//   }
//   // 画布初始化
//   canvasInit = () => {
//     let canvasId = this.refs.canvas.id;
//     let canva = document.getElementById(canvasId);
//     const cansText = canva.getContext("2d");
//     const { imageUrl } = this.props;
//     this.setState({
//       cansText, canva, imageUrl
//     }, () => {
//       // 加载图片
//       this.loadimage();
//     })

//   }

//   //加载
//   loadimage = () => {
//     const obj = this.state.image1;
//     const { cansText, canva, imageUrl } = this.state;
//     let bgImage = new Image();
//     bgImage.crossOrigin = "anonymous";//解决图片跨域
//     bgImage.src = imageUrl;
//     bgImage.onload = function () {
//       let bgImageW = bgImage.width;
//       let bgImageH = bgImage.height;
//       canva.width = 180;
//       canva.height = 180 * bgImageH / bgImageW;
//       cansText.drawImage(bgImage, 0, 0, 180, 180 * bgImageH / bgImageW);
//       if (obj.closeMoudle) return;
//       let image = new Image();
//       image.crossOrigin = "anonymous";//解决图片跨域
//       image.src = obj.src;
//       image.onload = function () {
//         cansText.drawImage(image, obj.x, obj.y, obj.width, obj.height);
//         obj.image = image;
//         if (obj.selected) {
//           // 虚线
//           cansText.setLineDash([5, 5]);//定义虚线的长度和间隔
//           cansText.strokeStyle = "#fff";
//           cansText.strokeRect(obj.x, obj.y, obj.width, obj.height);
//           //渲染伸缩图标
//           let scaleIcon = new Image();
//           scaleIcon.crossOrigin = "anonymous";
//           scaleIcon.src = obj.scaleIcon;
//           scaleIcon.onload = function () {
//             cansText.drawImage(scaleIcon, obj.x - 8, obj.y + obj.height - 12, 20, 20);
//           }
//           // 关闭遮层图标
//           let closeIcon = new Image();
//           closeIcon.crossOrigin = "anonymous";
//           closeIcon.src = obj.closeIcon;
//           closeIcon.onload = function () {
//             cansText.drawImage(closeIcon, obj.x + obj.width - 10, obj.y - 10, 20, 20)
//           }
//         }

//       }
//     }
//   }

//   // 监听鼠标按下事件
//   onmousedown = (e) => {
//     if (e) e.persist();
//     let that = this;
//     let { bounder, image1 } = that.state;
//     let mousex = e ? e.nativeEvent.offsetX : 1000;
//     let mousey = e ? e.nativeEvent.offsetY : 1000;
//     let bottom = image1.y + image1.height;
//     let top = image1.y;
//     let left = image1.x;
//     let right = image1.x + image1.width;


//     //判断，是否关闭遮层
//     if (right - 10 < mousex && mousex < right + 10 && top - 10 < mousey && mousey < top + 10) {
//       image1.closeMoudle = true;
//     }


//     // 判断，当前拖拽模块是否选中状态
//     if (right + 10 < mousex || mousex < left - 10 || bottom + 10 < mousey || mousey < top - 10) {
//       image1.selected = false;
//     } else {
//       image1.selected = true;
//     }

//     // 判断是缩放还是拖拽，若点击位置和边线的差大于bounder则认为是拖拽，否则是缩放
//     if ((left + bounder <= mousex && mousex <= right - bounder) && (top + bounder <= mousey && mousey <= bottom - bounder)) {
//       image1.drag = true;
//       image1.scale = false;
//       image1.scaleDirection = '';
//     } else if (0 <= mousex - left && mousex - left <= bounder) {
//       image1.scaleDirection = 'left';
//       image1.scale = true;
//       image1.drag = false;
//     } else if (0 <= right - mousex && right - mousex <= bounder) {
//       image1.scaleDirection = 'right';
//       image1.scale = false;
//       image1.drag = true;
//     }

//     if (0 <= mousey - top && mousey - top <= bounder) {
//       image1.scaleDirection += 'top';
//       image1.scale = false;
//       image1.drag = true;
//     } else if (0 <= bottom - mousey && bottom - mousey <= bounder) {
//       image1.scaleDirection += 'bottom';
//       image1.scale = true;
//       image1.drag = false;
//     }
//     this.loadimage();
//   }
//   // 鼠标弹起，重置所有事件参数
//   onmouseup = (e) => {
//     e.persist();
//     const { image1 } = this.state;
//     // body...
//     image1.drag = false;
//     image1.scale = false;
//     image1.scaleDirection = '';
//     this.setState({ image1 });
//   }
//   // 鼠标移动事件
//   onmousemove = (e) => {
//     e.persist();
//     const { image1, cansText, canva, imageUrl } = this.state;
//     // body...
//     let mousex = e.nativeEvent.offsetX;
//     let mousey = e.nativeEvent.offsetY;
//     if (image1.drag) {
//       // 画背景图
//       let bgImage = new Image();
//       bgImage.crossOrigin = "anonymous" //解决图片跨域
//       bgImage.src = imageUrl;
//       bgImage.onload = function () {
//         let bgImageW = bgImage.width;
//         let bgImageH = bgImage.height;
//         canva.width = 180;
//         canva.height = 180 * bgImageH / bgImageW;

//         // 鼠标移出canvas区域
//         if (mousex < 0 || mousex >= 180 || mousey >= canva.height - 5 || mousey <= 0) {
//           image1.drag = false;
//           image1.scale = false;
//         };
//         cansText.drawImage(bgImage, 0, 0, 180, 180 * bgImageH / bgImageW);

//         if (image1.closeMoudle) return;

//         // 移动图片
//         if (e.movementX || e.movementY) {
//           let tem_imgx = image1.x + e.movementX;
//           let tem_imgy = image1.y + e.movementY;
//           image1.x = tem_imgx;
//           image1.y = tem_imgy;
//           if (image1.x + image1.width >= 180) {
//             image1.x = 180 - image1.width;
//           }
//           if (image1.y + image1.height >= 180 * bgImageH / bgImageW) {
//             image1.y = 180 * bgImageH / bgImageW - image1.height;
//           }

//           if (image1.y <= 0) {
//             image1.y = 0;
//           }
//           if (image1.x <= 0) {
//             image1.x = 0;
//           }
//           if (image1.selected) {
//             //渲染伸缩图标
//             let scaleIcon = new Image();
//             scaleIcon.crossOrigin = "anonymous";
//             scaleIcon.src = image1.scaleIcon;
//             scaleIcon.onload = function () {
//               cansText.drawImage(scaleIcon, image1.x - 8, image1.y + image1.height - 12, 20, 20);
//             }
//             // 关闭遮层图标
//             let closeIcon = new Image();
//             closeIcon.crossOrigin = "anonymous";
//             closeIcon.src = image1.closeIcon;
//             closeIcon.onload = function () {
//               cansText.drawImage(closeIcon, image1.x + image1.width - 10, image1.y - 10, 20, 20)
//             }
//             // 虚线
//             cansText.setLineDash([5, 5]);//定义虚线的长度和间隔
//             cansText.strokeStyle = "#fff";
//             cansText.strokeRect(image1.x, image1.y, image1.width, image1.height);
//           }
//           // 清空画布
//           cansText.clearRect(image1.x, image1.y, image1.width, image1.height);

//           // 被拖拽的图片
//           cansText.drawImage(image1.image, image1.x, image1.y, image1.width, image1.height);
//         };
//       }

//     }

//     //缩放
//     if (image1.scale) {
//       // 画背景图
//       let bgImage = new Image();
//       bgImage.crossOrigin = "anonymous"//解决图片跨域
//       bgImage.src = imageUrl;
//       bgImage.onload = function () {
//         let bgImageW = bgImage.width;
//         let bgImageH = bgImage.height;
//         canva.width = 180;
//         canva.height = 180 * bgImageH / bgImageW;
//         cansText.drawImage(bgImage, 0, 0, 180, 180 * bgImageH / bgImageW);
//         // 缩放图片
//         if (e.movementX || e.movementY) {
//           let movex = e.movementX;
//           let movey = e.movementY;
//           if (movex !== 0 || movey !== 0) {
//             //根据x缩放方向判断固定点
//             if (image1.scaleDirection.search('right') !== -1) {
//               image1.width += movex;
//             } else if (image1.scaleDirection.search('left') !== -1) {
//               image1.x += movex;
//               image1.width -= movex;
//             }
//             if (image1.scaleDirection.search('bottom') !== -1) {
//               image1.height += movey;
//             } else if (image1.scaleDirection.search('top') !== -1) {
//               image1.height -= movey;
//               image1.y += movey;
//             }
//             // 清除画布
//             cansText.clearRect(image1.x, image1.y, image1.width, image1.height);
//             // 伸缩图标
//             //渲染伸缩图标
//             let scaleIcon = new Image();
//             scaleIcon.crossOrigin = "anonymous";
//             scaleIcon.src = image1.scaleIcon;
//             scaleIcon.onload = function () {
//               cansText.drawImage(scaleIcon, image1.x - 8, image1.y + image1.height - 12, 20, 20);
//             }

//             // 关闭遮层图标
//             let closeIcon = new Image();
//             closeIcon.crossOrigin = "anonymous";
//             closeIcon.src = image1.closeIcon;
//             closeIcon.onload = function () {
//               cansText.drawImage(closeIcon, image1.x + image1.width - 10, image1.y - 10, 20, 20)
//             }
//             // 虚线
//             cansText.setLineDash([5, 5]);//定义虚线的长度和间隔
//             cansText.strokeStyle = "#fff";
//             cansText.strokeRect(image1.x, image1.y, image1.width, image1.height);
//             // 被拖拽的图片
//             cansText.drawImage(image1.image, image1.x, image1.y, image1.width, image1.height);
//           };
//         };
//       }
//     }
//   }

//   // 保存图片
//   saveImage = () => {
//     let that = this;
//     let { canva, imgUrl } = that.state;
//     // 在导出画布之前，把一些图标、虚线去掉;
//     this.onmousedown();
//     setTimeout(function () {
//       imgUrl = canva.toDataURL('image/jpeg'); //转换图片为dataURL
//       that.setState({
//         imgUrl
//       }, () => {
//         let obj={};
//         if(that.props.id==='imageUrlFront'){
//           obj={imageUrlFront:that.state.imgUrl}
//         }else if(that.props.id==='imageUrlLeft'){
//           obj={imageUrlLeft:that.state.imgUrl}
//         }else if(that.props.id==='imageUrlRight'){
//           obj={imageUrlRight:that.state.imgUrl}
//         }
//         that.props.parent.getEidtImageUrl(that, obj)
//         message.success('保存成功')
//       })
//     }, 100);
//   }
//   // 重新编辑
//   reMake = () => {
//     let {image1}=this.state;
//     let newImage=Object.assign({},image1,{closeMoudle:false,selected:true}) 
//     this.setState({
//       image1:newImage
//     },()=>{
//       this.canvasInit();
//     })
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <div className="canvas-container">
//           <canvas onMouseUp={this.onmouseup} onMouseDown={this.onmousedown} onMouseMove={this.onmousemove} id={this.props.id} ref="canvas" style={{ backgroundColor: '#fff' }}>您的浏览器不支持画布标签</canvas>
//           <Button type="primary" size="small" onClick={this.saveImage}>保存图片</Button>
//           <Button type="default" size="small" style={{ marginLeft: '35px' }} onClick={this.reMake}>重新编辑</Button>
//         </div>
//       </React.Fragment>
//     );
//   }

// }

// export default EidtImage;
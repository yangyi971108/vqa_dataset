import React from "react";
import { Table, Input, Button } from "antd";
export default class EditTable extends React.Component {
  state = {
    dataSource: [],
    editArr: [],
  };
  componentDidMount() {
    const classes =['__background__', 
    'element in the array-list', 'root node in the Binary-tree',
    'internal node in the binary-tree', 'leaf node in the Binary-tree',
    'vertex in the Graph',
    'process in the Deadlock', 'resource in the Deadlock',
    'head element in the Queue', 'element in the Queue',
    'tail element in the Queue', 'head node in the Queue',
    'pointer in the Queue', 'node in the Non-binary-tree',
    'node in the Network_topology',
    'head element in the Linked_List', 'element in the Linked_List',
    'tail element in the Linked_List', 'insert element in the Linked_List',
    'head node in the Linked_List', 'arrow', 'edge',
    'top element in the Stack', 'bottom element in the Stack',
    'push element in the Stack', 'pop element in the Stack',
    'internal element in the Stack', 'empty stack in the Stack',
    'terminal in the Flowchart', 'process in the Flowchart',
    'decision in the Flowchart', 'flowline in the Flowchart',
    'document in the Flowchart', 'input in the Flowchart',
    'output in the Flowchart', 'annotation in the Flowchart',
    'database in the Flowchart', 'manual operation in the Flowchart',
    'predefined process in the Flowchart', 'on-page connector in the Flowchart'
    ]
    const {predictions} = this.props;
    let arr = [];
    if(predictions && predictions['predictions']){
        for (let i = 0; i < predictions['predictions'].length; i++) {
              arr.push({
                    id: i,
                    filename: predictions['filename'],
                    obj_id: i,
                    obj_label: classes[predictions['predictions'][i]['BoxList'][4]],
              });
        }
    }
    this.setState({ dataSource: arr });
  }

  componentWillReceiveProps(nextProps){
    const classes =['__background__', 
    'element in the array-list', 'root node in the Binary-tree',
    'internal node in the binary-tree', 'leaf node in the Binary-tree',
    'vertex in the Graph',
    'process in the Deadlock', 'resource in the Deadlock',
    'head element in the Queue', 'element in the Queue',
    'tail element in the Queue', 'head node in the Queue',
    'pointer in the Queue', 'node in the Non-binary-tree',
    'node in the Network_topology',
    'head element in the Linked_List', 'element in the Linked_List',
    'tail element in the Linked_List', 'insert element in the Linked_List',
    'head node in the Linked_List', 'arrow', 'edge',
    'top element in the Stack', 'bottom element in the Stack',
    'push element in the Stack', 'pop element in the Stack',
    'internal element in the Stack', 'empty stack in the Stack',
    'terminal in the Flowchart', 'process in the Flowchart',
    'decision in the Flowchart', 'flowline in the Flowchart',
    'document in the Flowchart', 'input in the Flowchart',
    'output in the Flowchart', 'annotation in the Flowchart',
    'database in the Flowchart', 'manual operation in the Flowchart',
    'predefined process in the Flowchart', 'on-page connector in the Flowchart'
    ]
    if(nextProps.predictions !== this.props.predictions){
      const {predictions} = nextProps;
      console.log('predictions',predictions)
      let arr = [];
      if(predictions && predictions['predictions']){
        for (let i = 0; i < predictions['predictions'].length; i++) {
              arr.push({
                    id: i,
                    filename: predictions['filename'],
                    obj_id: i,
                    obj_label: classes[predictions['predictions'][i]['BoxList'][4]],
              });
        }
      }
    this.setState({ dataSource: arr });
    }
  }
  // 渲染出来input,输入的时候改变dataSource的数据
  renderInput = (text, record, index, field) => {
    const { editArr } = this.state;
    return record.edit ? (
      <Input
        value={
          editArr[index] && editArr[index][field]
            ? editArr[index][field]
            : record[field]
        }
        onChange={(e) => this.inputChange(e, record, index, field)}
        // onPressEnter={(e) => this.handleSave(e, record)}
        // onBlur={(e) => this.handleSave(e, record)}
      />
    ) : (
      text
    );
  };

  // 编辑表格
  edit = (record, id) => {
    const { dataSource } = this.state;
    // 浅拷贝下数据
    const newArr = [...dataSource];
    // 找到index的值
    const index = newArr.findIndex((item) => item.id === id);
    // 利用splice方法删除原数据，新增新数据
    newArr.splice(index, 1, { ...record, edit: true });
    // 注意：一开始写法是const arr = newArr.splice(index, 1, { ...record, ...{ edit: true } });是错的，因为这个方法返回的是删除的那一条值
    this.setState({ dataSource: newArr });
  };

  // input改变的时候
  inputChange = (e, record, index, field) => {
    let { editArr } = this.state;
    editArr[index] = record;
    record[field] = e.target.value;
    this.setState({ editArr });
  };

  // 一键保存所有数据
  saveAll = () => {
    const { dataSource } = this.state;
    const arr = dataSource.map((item) => {
      return {
        ...item,
        edit: false,
      };
    });
    this.setState({ dataSource: arr }, () => {
      console.log(dataSource, "--dataSource");
    });
  };

  // 单条保存
  handleSave = (record, index) => {
    const { editArr, dataSource } = this.state;
    const newData = [...dataSource];
    // 用splice不改变原来的数组顺序
    newData.splice(index, 1, {
      ...record,
      ...editArr[index],
      edit: false,
    });
    this.setState({ dataSource: newData });
  };

  render() {
    
    const columns = [
      {
        title: "filename",
        dataIndex: "filename",
        key: "filename",
        render: (text, record, index) =>
          this.renderInput(text, record, index, "filename"),
      },
      {
        title: "obj_id",
        dataIndex: "obj_id",
        key: "obj_id",
        render: (text, record, index) =>
          this.renderInput(text, record, index, "obj_id"),
      },
      {
        title: "obj_label",
        dataIndex: "obj_label",
        key: "obj_label",
        render: (text, record, index) =>
          this.renderInput(text, record, index, "obj_label"),
      },
      {
        title: "edit",
        dataIndex: "edit",
        key: "edit",
        render: (text, record, index) => {
          return !record.edit ? (
            <span
              style={{ color: "black", cursor: "pointer" }}
              onClick={() => this.edit(record, record.id)}
            >
              edit
            </span>
          ) : (
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => this.handleSave(record, index)}
            >
              save
            </span>
          );
        },
      },
    ];

    return (
      <div style={{ width: "30%",position:'absolute',top:'70px',right:'10px' }}>
        <Table
          rowKey={(record) => record.id}
          dataSource={this.state.dataSource}
          columns={columns}
        />
      </div>
    );
  }
  
}

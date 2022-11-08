import React, {Component} from 'react';
import { List, Avatar, Button, Checkbox, Spin } from 'antd';
import satellite from "../assets/images/satellite.svg";


class SatelliteList extends Component {
    state ={
        selected: []
    }

    onChange =(e) =>{
        //step1: get satInfo and checked states
        //step2: add or remove to/from selected list
        const { dataInfo, checked } = e.target;
        const { selected } = this.state;
        const list = this.addOrRemove(dataInfo, checked, selected);
        this.setState({ selected: list })
    }

    addOrRemove = (item, status, list) => {
        //case 1:checked is true:
            //-item not in the list => add
        //case 2:check is false:
            //-item in the list =>remove
            //some method is iterate list to find the element is in the list
        const found = list.some(entry => entry.satid === item.satid);
        //if not found, add (add is ...
        if (status && !found){
            list =[...list, item]
        }
        // if found, delete (delete is filter 
        if (!status && found){
            list =list.filter(entry =>{
                return entry.satid !== item.satid;
            })
        }
        return list;
    }

    onShowSatMap = () =>{
        //send the selected arr to the Main 
        this.props.onShowMap(this.state.selected);
    }

    render() {
        const satList = this.props.satInfo ? this.props.satInfo.above : [];//数据结构要求[{}]
        const { isLoad } = this.props;
        const { selected } = this.state;
        return (
            <div className="sat-list-box">
                <Button className="sat-list-btn"
                        type="primary"
                        disabled={ selected.length === 0}
                        onClick={this.onShowSatMap}
                >Track</Button>
                <hr/>

                {
                    isLoad ?
                        <div className="spin-box">
                            <Spin tip="Loading..." size="large" />
                        </div>
                        :
                        <List
                            className="sat-list"
                            itemLayout="horizontal"
                            size="small"
                            dataSource={satList}
                            renderItem={item => (
                                <List.Item
                                    actions={[<Checkbox dataInfo={item} onChange={this.onChange}/>]}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar size={50} src={satellite} />}
                                        title={<p>{item.satname}</p>}
                                        description={`Launch Date: ${item.launchDate}`}
                                    />

                                </List.Item>
                            )}
                        />
                }
            </div>
        );

    }
}

export default SatelliteList;

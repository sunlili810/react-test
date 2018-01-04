import React, { Component } from 'react';
import Layout from 'components/layout2/layout2';
import Vis from 'vis';

// import DataSet from 'vis/lib/DataSet';
// import Network from 'vis/lib/network/Network';
// console.log(Network);

class PageComponent extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const imgSrc = '../../../../res/images/';
    const nodes = new Vis.DataSet([
      { id: 1, label: 'Node 1', image: `${imgSrc}broadlink.png`, shape: 'image' },
      { id: 2, label: 'Node 2', image: `${imgSrc}air_icon.png`, shape: 'image' },
      { id: 3, label: 'Node 3', image: `${imgSrc}air-lrd.png`, shape: 'image' },
      { id: 4, label: 'Node 4', image: `${imgSrc}consent.png`, shape: 'image' },
      { id: 5, label: 'Node 5', image: `${imgSrc}broadlink.png`, shape: 'image' }
    ]);

    // create an array with edges
    const edges = new Vis.DataSet([
      { from: 1, to: 3, label: '测试1', font: { align: 'middle' }, color: { color: 'red' } },
      { from: 1, to: 2, label: '测试2', color: 'rgb(20,24,200)', dashes: true },
      { from: 2, to: 4, label: '测试3', color: 'rgb(20,24,200)', dashes: true },
      { from: 2, to: 5, label: '测试4', color: 'rgb(20,24,200)' },
      { from: 3, to: 3, label: '测试5', color: 'rgb(20,24,200)' }
    ]);

    // create a network
    const container = document.getElementById('mynetwork');
    const data = {
      nodes,
      edges
    };
    const options = {};
    const network = new Vis.Network(container, data, options);
  }

  render() {
    return (
      <Layout name="item2">
        <div>
          <div
            id="mynetwork"
            style={{
              width: '600px',
              height: '400px',
              border: '1px solid lightgray' }}
          />
        </div>
      </Layout>
    );
  }
}

export default PageComponent;

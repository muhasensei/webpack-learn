import Post from '@models/Post';
import '@/styles/main.css';
import '@/styles/less.less';
import '@/styles/scss.scss';
import json from '@/additional/json.json'
import Logo from '@/additional/webpack-logo.png';
import xml from '@/additional/data.xml';
import * as $ from 'jquery';
import '@/babel';
import React from 'react';
import {render} from "react-dom";

console.log('XML: ', xml);
console.log('JSON: ', json);
console.log('Jquery: ', $);
const newPost = new Post('Covid Pandemic', Logo);
$('pre').html(newPost.getInfo());

const App = () => (
    <React.Fragment>
        <h1>React App</h1>
        <h2>Webpack learning</h2>
        <div className="logo"></div>
        <div className="box">
            <h2>Less</h2>
        </div>
        <div className="card">
            <h2>Sass</h2>
        </div>
    </React.Fragment>
);
render(<App/>, document.getElementById('root'));

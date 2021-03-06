import React, { Component } from 'react';

export default class ToolBar extends Component {
    state = {
        clipboardLabel: 'Copy this sessions code to the clipboard'
    }

    render() {
        
       const {language:l} = this.props;
       console.log('this is just the l variable', l)
       let downloadable = this.props.code ? this.props.code : this.props.code;

        return (
            <div className={this.props.drawerToggle ? 'toolbar-container' : 'toolbar-container hide'}>
                <div>
                    <div>
                        <h1>Just Code</h1>
                        <h2>Effortlessly collaborate</h2>
                    </div>
                    <a onClick={() => {
                        
                        this.setState({clipboardLabel: 'Copied'})
                        navigator.clipboard.writeText(downloadable)
                        setTimeout(()=>this.setState({clipboardLabel: 'Copy this sessions code to the clipboard'}), 2000)
                        
                        
                    }}>{this.state.clipboardLabel}</a>
                    <div className='instructions-container'>
                        <h2>How it works:</h2>
                        <p>Enter a name and hit <span>"Go"</span> to join or create a room, anyone in this same room will be able to collaborate in realtime</p>

                    </div>
                    <div className='room-selection-container container'>
                        <label for='room'>Room: </label>
                        <input name='room' id='room' onChange={(e) => this.props.roomChangeHandler(e.target.name, e.target.value)} value={this.props.room} />
                        <button onClick={() => window.location.pathname = this.props.room}>Go</button>
                    </div>

                    <div className='language-selection-container container'>
                        <label for='language'>Language: </label>
                        <select name='language' id='language' onChange={(e) => this.props.changeHandler(e.target.name, e.target.value)} value={this.props.language}>
                            <option value='javascript'>JavaScript</option>
                            <option value='html'>HTML</option>
                            <option value='css'>CSS</option>
                            <option value='scss'>SCSS</option>
                            <option value='typescript'>TypeScript</option>
                            <option value='java'>Java</option>
                            <option value='php'>PHP</option>
                            <option value='csharp'>C#</option>
                            <option value='python'>Python</option>
                            <option value='mysql'>MySQL</option>
                            <option value='pgsql'>PostgreSQL</option>
                            <option value='sql'>SQL</option>
                            <option value='markdown'>Mark Down</option>
                            <option value='text'>Text</option>
                        </select>
                    </div>

                    <div className='language-selection-container container'>
                        <label for='theme'>Theme: </label>
                        <select name='theme' id='theme' onChange={(e) => this.props.changeHandler(e.target.name, e.target.value)} value={this.props.theme}>
                            <option value='monokai'>Monokai</option>
                            <option value='github'>Github</option>
                            <option value='terminal'>terminal</option>
                            <option value='xcode'>xCode</option>
                            <option value='clouds_midnight'>Clouds Midnight</option>
                            <option value='eclipse'>Eclipse</option>
                            <option value='ambiance'>Ambiance</option>
                            <option value='cobalt'>Cobalt</option>
                        </select>
                    </div>

                    <div className='font-size-container container'>
                        <label for='fontsize'>Font Size: </label>
                        <input id='fontsize' type='number' name='fontSize' onChange={(e) => this.props.changeHandler(e.target.name, e.target.value)} value={this.props.fontSize} />
                        <label for='tabSize'>tabSize: </label>
                        <input id='tabSize' type='number' name='tabSize' onChange={(e) => this.props.changeHandler(e.target.name, e.target.value)} value={this.props.tabSize} />
                    </div>

                    <div className='wordWrap-container container'>
                        <label for='wordWrap'>Word Wrap: </label>
                        <select id='wordWrap' name='wordWrap' onChange={(e) => this.props.changeHandler(e.target.name, e.target.value)} value={this.props.wordWrap}>
                            <option value={false}>No-Wrap</option>
                            <option value={true}>Wrap</option>
                        </select>
                    </div>

                    <div className='wordWrap-container container'>
                        <label for='autoComplete'>Auto Complete: </label>
                        <select id='autoComplete' name='enableLiveAutocompletion' onChange={(e) => this.props.changeHandler(e.target.name, e.target.value)} value={this.props.enableLiveAutocompletion}>
                            <option value={false}>Disabled</option>
                            <option value={true}>Enabled</option>
                        </select>
                    </div>

                    <div className='attribution'>
                        <div>
                            <h3> Made with </h3>
                        <h3 className='made-with'>
                        <div>&lt;</div><div>3</div></h3>
                        <h3>by</h3>
                        <h3>&nbsp;<a href='https://www.joshborup.com'>Josh&nbsp;Borup</a> </h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
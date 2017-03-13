import React from 'react';
import { Link } from 'react-router';
/*
* “1 second ago” 형식으로 편하게 계산하여 나타내기 위하여 React-Timeago 라는 컴포넌트가 사용되었습니다.

 아직 Edited 시간을 알려주는 부분과 현재 Star 를 자신이 클릭했는지 안했는지 나타내는부분은 구현되지 않았습니다.
* */
import TimeAgo from 'react-timeago';


/*
* ...${expression}... 같은 표현은, ES6의 Template Literals 라는 문법입니다. 문자열 템플릿 안에 변수/상수 값을 손쉽게 넣을 수 있습니다.

 (이걸 사용하지 않는다면 ‘dropdown-‘ + ___  뭐 이런식으로 했어야겠죠? Template Literals 를 사용하면 읽기가 더 편합니다.
* */
class Memo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            value: props.data.contents
        };
        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleStar = this.handleStar.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState) {
        let current = {
            props: this.props,
            state: this.state
        };

        let next = {
            props: nextProps,
            state: nextState
        };

        let update = JSON.stringify(current) !== JSON.stringify(next);
        return update;
    }
    handleStar() {
        console.log("컴포넌트 메모 핸들 스타");
        let id = this.props.data._id;
        let index = this.props.index;
        this.props.onStar(id, index);
    }

    toggleEdit() {
        console.log("컴포넌트 메모 토글 에디트");
        if(this.state.editMode) {
            let id = this.props.data._id;
            let index = this.props.index;
            let contents = this.state.value;

            this.props.onEdit(id, index, contents).then(() => {
                this.setState({
                    editMode: !this.state.editMode
                });
            })
        } else {
            this.setState({
                editMode: !this.state.editMode
            });
        }
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        });
    }

    handleRemove() {
        let id = this.props.data._id;
        let index = this.props.index;
        this.props.onRemove(id, index);
    }

    render() {
        console.log('메모 렌더링링');
        const { data, ownership } = this.props;
        let starStyle = (this.props.data.starred.indexOf(this.props.currentUser) > -1) ? { color: '#ff9980' } : {} ;
        const dropDownMenu = (
            <div className="option-button">
                <a className='dropdown-button'
                   id={`dropdown-button-${data._id}`}
                   data-activates={`dropdown-${data._id}`}>
                    <i className="material-icons icon-button">more_vert</i>
                </a>
                <ul id={`dropdown-${this.props.data._id}`} className='dropdown-content'>
                    <li><a onClick={this.toggleEdit} >Edit</a></li>
                    <li><a onClick={this.handleRemove}>Remove</a></li>
                </ul>
            </div>
        );

        // EDITED info
        let editedInfo = (
            <span style={{color: '#AAB5BC'}}> · Edited <TimeAgo date={this.props.data.date.edited} live={true}/></span>
        );

        const memoView = (
            <div className="card">
                <div className="info">
                    <Link to={`/wall/${this.props.data.writer}`} className="username">{this.props.data.writer}</Link> wrote a log · <TimeAgo date={this.props.data.date.created}/>
                    { this.props.data.is_edited ? editedInfo : undefined }
                    { ownership ? dropDownMenu : undefined }
                </div>
                <div className="card-content">
                    {data.contents}
                </div>
                <div className="footer">
                    <i className="material-icons log-footer-icon star icon-button"  style={starStyle}
                       onClick={this.handleStar} >star</i>
                    <span className="star-count">{this.props.data.starred.length}</span>
                </div>
            </div>
        );

        const editView = (
            <div className="write">
                <div className="card">
                    <div className="card-content">
                       <textarea
                           className="materialize-textarea"
                           value={this.state.value}
                           onChange={this.handleChange}></textarea>
                    </div>
                    <div className="card-action">
                        <a onClick={this.toggleEdit}>OK</a>
                    </div>
                </div>
            </div>
        );




        return(
            <div className="container memo">
                { this.state.editMode ? editView : memoView }
            </div>
        );
    }

    componentDidUpdate() {
        // WHEN COMPONENT UPDATES, INITIALIZE DROPDOWN
        // (TRIGGERED WHEN LOGGED IN)
        $('#dropdown-button-'+this.props.data._id).dropdown({
            belowOrigin: true // Displays dropdown below the button
        });
    }

    componentDidMount() {
        // WHEN COMPONENT MOUNTS, INITIALIZE DROPDOWN
        // (TRIGGERED WHEN REFRESHED)
        $('#dropdown-button-'+this.props.data._id).dropdown({
            belowOrigin: true // Displays dropdown below the button
        });
    }
}

// ownership 해당 메모가 자신의 메모인지 확인
Memo.propTypes = {
    data: React.PropTypes.object,
    ownership: React.PropTypes.bool,
    onEdit: React.PropTypes.func,
    index: React.PropTypes.number,
    onRemove: React.PropTypes.func,
    onStar: React.PropTypes.func,
    starStatus: React.PropTypes.object,
    currentUser: React.PropTypes.string
};

Memo.defaultProps = {
    data: {
        _id: 'id1234567890',
        writer: 'Writer',
        contents: 'Contents',
        is_edited: false,
        date: {
            edited: new Date(),
            created: new Date()
        },
        starred: []
    },
    ownership: true,
    onEdit: (id, index, contents) => {
        console.error('onEdit function not defined');
    },
    index: -1,
    onRemove: (id, index) => {
        console.error('remove function not defined');
    },
    onStar: (id, index) => {
        console.error('star function not defined');
    },
    starStatus: {},
    currentUser: ''
}

export default Memo;
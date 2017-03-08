import React from 'react';

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
    render() {
        const { data, ownership } = this.props;

        const dropDownMenu = (
            <div className="option-button">
                <a className='dropdown-button'
                   id={`dropdown-button-${data._id}`}
                   data-activates={`dropdown-${data._id}`}>
                    <i className="material-icons icon-button">more_vert</i>
                </a>
                <ul id={`dropdown-${data._id}`} className='dropdown-content'>
                    <li><a>Edit</a></li>
                    <li><a>Remove</a></li>
                </ul>
            </div>
        );

        const memoView = (
            <div className="card">
                <div className="info">
                    <a className="username">{this.props.data.writer}</a> wrote a log · <TimeAgo date={this.props.data.date.created}/>
                    { ownership ? dropDownMenu : undefined }
                    <div className="option-button">
                        <a className='dropdown-button'
                           id={`dropdown-button-${data._id}`}
                           data-activates={`dropdown-${data._id}`}>
                            <i className="material-icons icon-button">more_vert</i>
                        </a>
                        <ul id={`dropdown-${data._id}`} className='dropdown-content'>
                            <li><a>Edit</a></li>
                            <li><a>Remove</a></li>
                        </ul>
                    </div>
                </div>
                <div className="card-content">
                    {data.contents}
                </div>
                <div className="footer">
                    <i className="material-icons log-footer-icon star icon-button">star</i>
                    <span className="star-count">{data.starred.length}</span>
                </div>
            </div>
        );


        return(
            <div className="container memo">
                {memoView}
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
    ownership: React.PropTypes.bool
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
    ownership: true
}

export default Memo;
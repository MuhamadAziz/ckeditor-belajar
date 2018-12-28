import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

// import ckeditor from './ckeditor/ckeditor.js';
const loadScript = require('load-script');

var defaultScriptUrl =  'https://cdn.ckeditor.com/4.11.1/full-all/ckeditor.js';


/**
 * @author codeslayer1
 * @description CKEditor component to render a CKEditor textarea with defined configs and all CKEditor events handler
 */
class CKEditor extends React.Component {
  constructor(props) {
    super(props);

    //Bindings
    this.onLoad = this.onLoad.bind(this);

    //State initialization
    this.state = {
      isScriptLoaded: props.isScriptLoaded
    };
  }

  //load ckeditor script as soon as component mounts if not already loaded
  componentDidMount() {
    if (!this.state.isScriptLoaded) {
      loadScript(this.props.scriptUrl, this.onLoad);
    } else {
      this.onLoad();
    }
  }

  componentWillReceiveProps(props) {
    const editor = this.editorInstance;
    if (editor && editor.getData() !== props.content) {
      editor.setData(props.content);
    }
  }

  componentWillUnmount() {
    this.unmounting = true;
  }

  onLoad() {
    if (this.unmounting) return;

    this.setState({
      isScriptLoaded: true
    });

    if (!window.CKEDITOR) {
      console.error('CKEditor not found');
      return;
    }

    this.editorInstance = window.CKEDITOR.appendTo(
      ReactDOM.findDOMNode(this),

      {
        extraPlugins: 'easyimage',
        removePlugins: 'image',
        removeDialogTabs: 'link:advanced',
        toolbar: [{
            name: 'document',
            items: ['Undo', 'Redo']
          },
          {
            name: 'styles',
            items: ['Format']
          },
          {
            name: 'basicstyles',
            items: ['Bold', 'Italic', 'Strike', '-', 'RemoveFormat']
          },
          {
            name: 'paragraph',
            items: ['NumberedList', 'BulletedList']
          },
          {
            name: 'links',
            items: ['Link', 'Unlink']
          },
          {
            name: 'insert',
            items: ['EasyImageUpload']
          }
        ],
        height: 630,
        cloudServices_uploadUrl: 'https://33333.cke-cs.com/easyimage/upload/',
        // Note: this is a token endpoint to be used for CKEditor 4 samples only. Images uploaded using this token may be deleted automatically at any moment.
        // To create your own token URL please visit https://ckeditor.com/ckeditor-cloud-services/.
        cloudServices_tokenUrl: 'https://33333.cke-cs.com/token/dev/ijrDsqFix838Gh3wGO3F77FSW94BwcLXprJ4APSp3XQ26xsUHTi0jcb1hoBt',
        easyimage_styles: {
          gradient1: {
            group: 'easyimage-gradients',
            attributes: {
              'class': 'easyimage-gradient-1'
            },
            label: 'Blue Gradient',
            icon: 'https://ckeditor.com/docs/ckeditor4/4.11.1/examples/assets/easyimage/icons/gradient1.png',
            iconHiDpi: 'https://ckeditor.com/docs/ckeditor4/4.11.1/examples/assets/easyimage/icons/hidpi/gradient1.png'
          },
          gradient2: {
            group: 'easyimage-gradients',
            attributes: {
              'class': 'easyimage-gradient-2'
            },
            label: 'Pink Gradient',
            icon: 'https://ckeditor.com/docs/ckeditor4/4.11.1/examples/assets/easyimage/icons/gradient2.png',
            iconHiDpi: 'https://ckeditor.com/docs/ckeditor4/4.11.1/examples/assets/easyimage/icons/hidpi/gradient2.png'
          },
          noGradient: {
            group: 'easyimage-gradients',
            attributes: {
              'class': 'easyimage-no-gradient'
            },
            label: 'No Gradient',
            icon: 'https://ckeditor.com/docs/ckeditor4/4.11.1/examples/assets/easyimage/icons/nogradient.png',
            iconHiDpi: 'https://ckeditor.com/docs/ckeditor4/4.11.1/examples/assets/easyimage/icons/hidpi/nogradient.png'
          }
        },
        easyimage_toolbar: [
          'EasyImageFull',
          'EasyImageSide',
          'EasyImageGradient1',
          'EasyImageGradient2',
          'EasyImageNoGradient',
          'EasyImageAlt'
        ]
      }
    );

    //Register listener for custom events if any
    for (var event in this.props.events) {
      var eventHandler = this.props.events[event];

      this.editorInstance.on(event, eventHandler);
    }
  }

  render() {
    return <div className={this.props.activeClass} />;
  }
}

CKEditor.defaultProps = {
  content: '',
  config: {},
  isScriptLoaded: false,
  scriptUrl: defaultScriptUrl,

  activeClass: '',
  events: {}
};

CKEditor.propTypes = {
  content: PropTypes.any,
  config: PropTypes.object,
  isScriptLoaded: PropTypes.bool,
  scriptUrl: PropTypes.string,
  activeClass: PropTypes.string,
  events: PropTypes.object
};


export default CKEditor;

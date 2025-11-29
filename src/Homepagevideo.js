   import React from 'react';
    import { View, StyleSheet} from 'react-native';
    import Video from 'react-native-video';
    import homepagevideo from '../assets/homevideo1.mp4'
    const Homepagevideo = () => {
      return (
        <View style={styles.container}>
          <Video
            source={homepagevideo} // Can be a local file path or a remote URI
            style={styles.backgroundVideo}
            resizeMode="contain" // or 'contain', 'stretch'
            paused={false} // Set to true to pause initially
            repeat={true} // Set to true to loop the video
            onBuffer={() => console.log('Buffering...')} // Callback for buffering events
            onError={(error) => console.error('Video error:', error)} // Callback for errors
          />
        </View>
      );
    };

    const styles = StyleSheet.create({
      container: {
        borderWidth: 1,
        // borderColor: '#ffa500',
        borderColor:'#e7691b',
        borderRadius: 25,
        width: 320,
        height:200,
        overflow: 'hidden', 
        display:'flex',
        alignSelf:'center'
    
      },
      backgroundVideo: {
        flex: 1
      },
    });

    export default Homepagevideo;
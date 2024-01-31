import React, { useState, useRef } from 'react';
import { View, Image, TouchableOpacity, Button } from 'react-native';
import Svg, { Image as SvgImage, TSpan,Text } from 'react-native-svg';
import ViewShot from 'react-native-view-shot';
import { Slider,Icon } from '@rneui/themed';
import { colors } from '../utils/constants';

interface TextElement {
  content: string;
  x: number;
  y: number;
  fontSize: number;
  fill: string;
  isVisible: boolean;
}
interface LogoElement {
  uri: string;
  x: number;
  y: number;
  height: number | string;
  width:number | string;
  isVisible: boolean;
}

interface Template {
  id: number;
  backgroundImage: string;
  logo: LogoElement;
  text: TextElement[];
}

const templates: Template[] = [
  {
    id: 1,
    backgroundImage:'https://res.cloudinary.com/drxhgcqvw/image/upload/v1706627497/aeuf9p7asbhj47h46ul2.jpg',
    logo: { uri:'https://res.cloudinary.com/drxhgcqvw/image/upload/v1705428150/ysxh4cpuke6va2sqhou8.png', x: 50, y: 50,height:50,width:'auto', isVisible: true },
    text: [
      { content: 'Text 1', x: 50, y: 50, fontSize: 20, fill: 'red', isVisible: true },
      { content: 'Text 2', x: 100, y: 100, fontSize: 30, fill: 'red', isVisible: true },
    ],
  },
  {
    id: 1,
    backgroundImage:'https://res.cloudinary.com/drxhgcqvw/image/upload/v1706627497/aeuf9p7asbhj47h46ul2.jpg',
    logo: { uri:'https://res.cloudinary.com/drxhgcqvw/image/upload/v1705428150/ysxh4cpuke6va2sqhou8.png', x: 50, y: 50,height:50,width:'auto', isVisible: true },
    text: [
      { content: 'Text 1', x: 50, y: 50, fontSize: 20, fill: 'red', isVisible: true },
      { content: 'Text 2', x: 100, y: 100, fontSize: 30, fill: 'red', isVisible: true },
    ],
  },
  // More templates
];

const TemplateEditorApp: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>( {
    id: 1,
    backgroundImage: 'https://res.cloudinary.com/drxhgcqvw/image/upload/v1706627497/aeuf9p7asbhj47h46ul2.jpg',
    logo: { uri:'https://res.cloudinary.com/drxhgcqvw/image/upload/v1705428150/ysxh4cpuke6va2sqhou8.png', x: 50, y: 50,height:50,width:50, isVisible: true },
    text: [
      { content: 'Coffee Shop', x: 10, y: 200, fontSize: 40, fill: 'white', isVisible: true },
      { content: 'See More', x: 40, y: 310, fontSize: 20, fill: 'white', isVisible: true },
    ],
  },);
  const [fontMultiplier, setFontMultiplier] = useState<{ [key: number]: number }>({});
  const [logoPosition, setLogoPosition] = useState<{ x: number; y: number }>({ x: 150, y: 150 });

  const viewShotRef = useRef<ViewShot>(null);

  // ... Other functions
  const toggleTextVisibility = (index: number) => {
    if (selectedTemplate) {
      const updatedText = [...selectedTemplate.text];
      updatedText[index].isVisible = !updatedText[index].isVisible;
      setSelectedTemplate({ ...selectedTemplate, text: updatedText });
    }
  };

  const saveImage = async () => {
    if (viewShotRef.current) {
      try {
        if(typeof viewShotRef.current.capture==='function'){

          const uri = await viewShotRef.current.capture();
          // Now you can use 'uri' to save the image or perform other actions
          console.log('Image saved at:', uri);
        }
      } catch (error) {
        console.error('Error capturing image:', error);
      }
    }
  };


  const moveText = (index: number, direction: 'left' | 'right' | 'up' | 'down') => {
    if (selectedTemplate) {
      const updatedText = [...selectedTemplate.text];
      const stepSize = 10; // Adjust step size as needed

      switch (direction) {
        case 'left':
          updatedText[index].x -= stepSize;
          console.warn(updatedText[index].x)
          break;
        case 'right':
          updatedText[index].x += stepSize;
          break;
        case 'up':
          updatedText[index].y -= stepSize;
          break;
        case 'down':
          updatedText[index].y += stepSize;
          break;
        default:
          break;
      }

      setSelectedTemplate({ ...selectedTemplate, text: updatedText });
    }
  };
  const moveLogo = ( direction: 'left' | 'right' | 'up' | 'down') => {
    if (selectedTemplate) {
      // const updatedText = [...selectedTemplate.logo];
      const stepSize = 10; // Adjust step size as needed

      switch (direction) {
        case 'left':
          setSelectedTemplate({...selectedTemplate,logo:{...selectedTemplate.logo,x:selectedTemplate.logo.x-stepSize}})
          break;
        case 'right':
          setSelectedTemplate({...selectedTemplate,logo:{...selectedTemplate.logo,x:selectedTemplate.logo.x+stepSize}})
          break;
        case 'up':
          setSelectedTemplate({...selectedTemplate,logo:{...selectedTemplate.logo,y:selectedTemplate.logo.y-stepSize}})
          break;
        case 'down':
          setSelectedTemplate({...selectedTemplate,logo:{...selectedTemplate.logo,y:selectedTemplate.logo.y+stepSize}})
          break;
        default:
          break;
      }

      // setSelectedTemplate({ ...selectedTemplate, text: updatedText });
    }
  };

  const handleTextSizeChange = (value: number, index: number) => {
    // console.warn("calling handleTextchange")
    setFontMultiplier((prevMultiplier) => ({ ...prevMultiplier, [index]: value }));
  };

  const handleMoveLogoLeft = () => {
    setLogoPosition((prevPosition) => ({ ...prevPosition, x: prevPosition.x - 5 }));
  };

  const handleMoveLogoRight = () => {
    setLogoPosition((prevPosition) => ({ ...prevPosition, x: prevPosition.x + 5 }));
  };

  const handleMoveLogoUp = () => {
    setLogoPosition((prevPosition) => ({ ...prevPosition, y: prevPosition.y - 5 }));
  };

  const handleMoveLogoDown = () => {
    setLogoPosition((prevPosition) => ({ ...prevPosition, y: prevPosition.y + 5 }));
  };

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 0.9 }} style={{width:'100%',height:'50%',backgroundColor:'yellow'}}>
        <Svg height="100%" width="100%">
          <SvgImage href={{uri:selectedTemplate?.backgroundImage}} height="100%" width="100%" />
          {selectedTemplate && selectedTemplate.text.map((textElement, index) =>
          textElement.isVisible ? (
            <Text
              key={index}
              x={textElement.x}
              y={textElement.y}
              // fontSize={textElement.fontSize}
              fontSize={fontMultiplier[index] || textElement.fontSize}
              // fontSize={(fontMultiplier[index] || 1) + textElement.fontSize}
              fill={textElement.fill}
            >
              <TSpan fontFamily='Montserrat-Bold'>{textElement.content}</TSpan>
            </Text>
          ) : null
        )}
          <SvgImage href={{ uri: selectedTemplate?.logo.uri }} x={selectedTemplate?.logo.x} y={selectedTemplate?.logo.y} width={selectedTemplate?.logo.height} height={selectedTemplate?.logo.width} />
        </Svg>
      </ViewShot>

      {/* Buttons for adjusting text size */}
      {selectedTemplate &&
        selectedTemplate.text.map((textElement, index) => (
          <Slider
            key={index}
            style={{ width: 200, marginTop: 20 }}
            minimumValue={10}
            maximumValue={70}
            step={1}
            value={fontMultiplier[index] || textElement.fontSize}
            trackStyle={{ height: 2, backgroundColor:'blue'}}
            thumbStyle={{ height: 15, width: 15, backgroundColor:`${colors.ActiveColor2}` }}
            // thumbProps={{
            //   children: (
            //     <Icon
            //       name="heartbeat"
            //       type="font-awesome"
            //       size={20}
            //       reverse
            //       containerStyle={{ bottom: 20, right: 20 }}
            //       // color={color()}
            //     />)}}
            onValueChange={(value) => handleTextSizeChange(value, index)}
          />
          // <View key={index}>
          // <Button
          //   // key={index}
          //   title={`Text ${index + 1}`}
          //   onPress={() => handleTextSizeIncrease(fontMultiplier[index] + 2, index)}
          //   />
          // <Button
          //   // key={index}
          //   title={`Text ${index + 1}`}
          //   onPress={() => handleTextSizeDecrease(fontMultiplier[index] - 2, index)}
          //   />
          //   </View>
        ))}
        

      {/* Buttons for adjusting logo position */}
      {/* <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Button title="Left" onPress={handleMoveLogoLeft} />
        <Button title="Right" onPress={handleMoveLogoRight} />
        <Button title="Up" onPress={handleMoveLogoUp} />
        <Button title="Down" onPress={handleMoveLogoDown} />
      </View> */}
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Button title="Left" onPress={()=>moveLogo('left')} />
        <Button title="Right" onPress={()=>moveLogo('right')} />
        <Button title="Up" onPress={()=>moveLogo('up')} />
        <Button title="Down" onPress={()=>moveLogo('down')} />
      </View>


      <View style={{ flexDirection: 'row',flexWrap:'wrap', marginTop: 20 }}>
        {selectedTemplate &&
          selectedTemplate.text.map((_, index) => (
            <View key={index} style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => toggleTextVisibility(index)}>
                <Button title={`Toggle Text ${index + 1}`} onPress={() => toggleTextVisibility(index)} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => moveText(index, 'left')}>
                <Button title={`Left ${index + 1}`} onPress={() => moveText(index, 'left')} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => moveText(index, 'right')}>
                <Button title={`Right ${index + 1}`} onPress={() => moveText(index, 'right')} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => moveText(index, 'up')}>
                <Button title={`Up ${index + 1}`} onPress={() => moveText(index, 'up')} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => moveText(index, 'down')}>
                <Button title={`Down ${index + 1}`} onPress={() => moveText(index, 'down')} />
              </TouchableOpacity>
            </View>
          ))}
      </View>

      {/* ... Other UI components */}
      <TouchableOpacity onPress={saveImage}>
        <Button title="Save Image" onPress={saveImage} />
      </TouchableOpacity>

      {/* ... Other UI components */}
    </View>
  );
};

export default TemplateEditorApp;

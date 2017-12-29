import React, {Component} from "react";
import {ListView, Keyboard} from "react-native";
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    List,
    ListItem,
    Text,
    Left,
    Right,
    Body,
    Item,
    Input,
    Form
} from "native-base";
import styles from "./styles";

/**
 * This is the Array that holdes all the To-Do-List Items
 * @type {string[]} The main data array.
 */
const datas = [
    "Get eggs",
    "Milk",
    "Brush teeth",
    "Hola dude",
    "MMhm",
    "Okedhjedhjehdjehdjehdjhedjhejdhejhdjehdjehdjehdjehjdhejdhejhdjehdjhed",
    "12345",
    "😀"
];

export default class App extends Component {

    /**
     * Simple constructor.
     * @param props
     */
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            basic: true,
            listViewData: datas,
            text: ''
        };
    }

    /**
     * This function removes the selected item from the array
     * Swiping left on the element will give a trash symbol where
     * the user can delete the selected element.
     * @param secId
     * @param rowId
     * @param rowMap
     */
    deleteRow(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        this.setState({listViewData: newData});
    }

    /**
     * This function adds an element to the bottom of the array.
     */
    addRow() {
        const newData = [...this.state.listViewData];
        newData.push(this.state.text);
        this.setState({listViewData: newData});
        Keyboard.dismiss();
        this.setState({text: ""})
    }

    /**
     * This function gets the text from the textbox and stores it
     */
    handleChange(event){
        this.setState({value: event.target.value});
    }

    /**
     * Main render, renders the entire view of the app.
     * @returns {*} n/a
     */
    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    {/*This left function pushes the title to the left.*/}                    
                    <Left/>

                    <Body style={{flex: 3}}>
                    <Title>To Do List</Title>
                    </Body>
                    {/* This right command pushes the title to the right thus centering it. */}
                    <Right/>
                </Header>

                <Form>
                    <Item>
                        <Input placeholder="TEXTBOX NOT ITEM"
                               ref= {(el) => { this.text = el; }}
                               onChangeText={(text) => this.setState({text})}
                        />
                        <Button full danger onPress={_ => this.addRow()}>
                            <Icon active name="trash"/>
                        </Button>
                    </Item>
                </Form>



                {/* This is the content tab where all of the items are going to be stored */}
                <Content>
                    <List
                        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                        renderRow={data =>
                            <ListItem style={{paddingLeft: 20}}>
                                <Text>
                                    {data}
                                </Text>
                            </ListItem>}
                        renderLeftHiddenRow={data =>
                            <Button
                                full
                                onPress={() => alert(data)}
                                style={{
                                    backgroundColor: "#CCC",
                                    flex: 1,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <Icon active name="information-circle"/>
                            </Button>}
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                            <Button
                                full
                                danger
                                onPress={_ => this.deleteRow(secId, rowId, rowMap)}
                                style={{
                                    flex: 1,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <Icon active name="trash"/>
                            </Button>}
                        leftOpenValue={0}
                        rightOpenValue={-75}
                    />
                </Content>
            </Container>
        );
    }
}


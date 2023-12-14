import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./Header";
import FriendList from "./FriendList";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import Summary from "./Summary";
import Footer from "./Footer";
import AutoDismissPopup from "./AutoDismissPopup";
import PopupModal from "./PopupModal";
import SettleExpensesModal from "./SettleExpenseModal";
import CongratulationModal from "./CongratulationModal";
import GroupList from "./Group";
import { v4 as uuidv4 } from "uuid";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: [],
      expenses: [],
      groups: [],
      showPopup: false,
      popupMessage: "",
      showModal: false,
      showSettleModal: false,
      hasFriends: false,
      showCongratulationModal: false,
      congratulationFriendName: "",
      totalSettledAmounts: {},
    };
  }

  handleAddFriend = (friendName) => {
    const newFriend = {
      id: uuidv4(),
      name: friendName,
    };

    this.setState(
      (prevState) => ({
        friends: [...prevState.friends, newFriend],
        expenses: prevState.expenses.map((expense) => ({
          ...expense,
          friendShares: {
            ...expense.friendShares,
            [newFriend.id]: 0,
          },
        })),
        hasFriends: true,
      }),
      () => console.log("State after adding friend:", this.state)
    );
  };

  handleAddExpense = (expense) => {
    const { description, amount, selectedFriends, isUnequalSplit, friendShares } = expense;
  
    if (!selectedFriends || selectedFriends.length === 0) {
      this.setState({
        showModal: true,
      });
      return;
    }
  
    const newExpense = {
      id: uuidv4(),
      description,
      amount,
      timestamp: Date.now(),
      friendShares: {},
    };
  
    if (isUnequalSplit) {
      // Unequal split logic
      Object.entries(friendShares).forEach(([friendId, share]) => {
        newExpense.friendShares[friendId] = parseFloat(share);
      });
    } else {
      // Equal split logic
      const equalShare = amount / selectedFriends.length;
      selectedFriends.forEach((friendId) => {
        newExpense.friendShares[friendId] = equalShare;
      });
    }
  
    this.setState((prevState) => ({
      expenses: [...prevState.expenses, newExpense],
      friends: selectedFriends.reduce((updatedFriends, friendId) => {
        if (!prevState.friends.find((friend) => friend.id === friendId)) {
          return [
            ...updatedFriends,
            {
              id: friendId,
              name: `Friend ${updatedFriends.length + 1}`,
            },
          ];
        }
        return updatedFriends;
      }, prevState.friends),
      showPopup: true,
      popupMessage: "Expense added successfully!",
    }));
  
    setTimeout(() => {
      this.setState({
        showPopup: false,
        popupMessage: "",
      });
    }, 2000);
  };
  

  handleSettleExpenses = ({ friendId, amount }) => {
    const { friends } = this.state;

    this.setState(
      (prevState) => ({
        friends: prevState.friends.map((friend) => {
          if (friend.id === friendId) {
            return {
              ...friend,
              settledAmount: (friend.settledAmount || 0) + amount,
            };
          }
          return friend;
        }),
        expenses: prevState.expenses,
        showSettleModal: false,
      }),
      () => {
        const settledFriend = friends.find((friend) => friend.id === friendId);
        console.log("Settled Friend:", settledFriend);
        this.handleShowCongratulationModal(settledFriend?.name, amount);
      }
    );
  };

  handleShowCongratulationModal = (friendName, settledAmount) => {
    this.setState({
      showCongratulationModal: true,
      congratulationFriendName: friendName,
      settledAmount: settledAmount,
    });

    setTimeout(() => {
      this.setState({
        showCongratulationModal: false,
        congratulationFriendName: "",
        settledAmount: undefined,
      });
    }, 10000);
  };

  handleAddGroup = (groupName) => {
    const newGroup = {
      id: uuidv4(),
      name: groupName,
    };
  
    this.setState((prevState) => ({
      groups: [...prevState.groups, newGroup],
    }));
  };

  render() {
    const {
      friends,
      expenses,
      groups,
      showPopup,
      popupMessage,
      showModal,
      showSettleModal,
      showCongratulationModal,
      congratulationFriendName,
      settledAmount,
      hasFriends,
    } = this.state;
    const totalAmount = expenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );

    return (
      <Container fluid className="App">
        <Header
          dark={true}
          headerClassName="justify-content-center"
          className="Header"
        >
          EquiExpense
        </Header>
        <Container className="custom-container">
          <Row>
            <Col md={4}>
              <FriendList friends={friends} expenses={expenses} />
              <GroupList groups={groups} />
              {hasFriends && (
                <button
                  className="settle-expenses-button"
                  onClick={() => this.setState({ showSettleModal: true })}
                >
                  <i className="fa-regular fa-handshake"></i> Settle Expenses
                </button>
              )}
            </Col>
            <Col md={8}>
              <ExpenseForm
                onAddFriend={this.handleAddFriend}
                onAddExpense={this.handleAddExpense}
                onAddGroup={this.handleAddGroup}
                friends={friends}
              />
              <ExpenseList expenses={expenses} friends={friends} />
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <Summary
                totalAmount={totalAmount}
                expenses={expenses}
                friends={friends}
              />
            </Col>
          </Row>
        </Container>
        {showPopup && (
          <AutoDismissPopup
            show={showPopup}
            handleClose={() =>
              this.setState({ showPopup: false, popupMessage: "" })
            }
            message={popupMessage}
          />
        )}
        {showModal && (
          <PopupModal
            show={showModal}
            handleClose={() => this.setState({ showModal: false })}
          />
        )}
        {hasFriends && (
          <SettleExpensesModal
            show={showSettleModal}
            friends={friends}
            onSettle={this.handleSettleExpenses}
            handleClose={() => this.setState({ showSettleModal: false })}
          />
        )}
        {/*  CongratulationModal component */}
        {showCongratulationModal && (
          <CongratulationModal
            show={showCongratulationModal}
            handleClose={() =>
              this.setState({ showCongratulationModal: false })
            }
            friendName={congratulationFriendName}
            settledAmount={settledAmount}
          />
        )}
        <Footer />
      </Container>
    );
  }
}

export default App;

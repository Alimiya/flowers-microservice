pragma solidity ^0.8.0;

contract DeliveryContract {
    enum DeliveryStatus { NotPaid, InProgress, InTransit, Delivered }

    struct Delivery {
        uint256 id;
        address user;
        address store;
        string addressDetails;
        uint256 cost;
        DeliveryStatus status;
    }

    uint256 public deliveryCounter;
    mapping(uint256 => Delivery) public deliveries;

    event OrderCreated(uint256 indexed id, address indexed user, uint256 cost);
    event OrderSent(uint256 indexed id);
    event OrderCompleted(uint256 indexed id);

    constructor() {
        deliveryCounter = 0;
    }

    function createOrder(string memory _addressDetails, uint256 _cost) external returns (uint256) {
        require(_cost > 0, "Cost must be greater than 0");

        deliveryCounter++;
        deliveries[deliveryCounter] = Delivery({
            id: deliveryCounter,
            user: msg.sender,
            store: address(0),
            addressDetails: _addressDetails,
            cost: _cost,
            status: DeliveryStatus.NotPaid
        });

        emit OrderCreated(deliveryCounter, msg.sender, _cost);
        return deliveryCounter;
    }

    function sendOrder(uint256 _id) external {
        require(_id <= deliveryCounter, "Invalid order ID");
        Delivery storage delivery = deliveries[_id];
        require(delivery.status == DeliveryStatus.NotPaid, "Order is not in NotPaid state");
        require(delivery.user == msg.sender, "Access denied");

        delivery.status = DeliveryStatus.InProgress;

        emit OrderSent(_id);
    }

    function completeOrder(uint256 _id) external {
        require(_id <= deliveryCounter, "Invalid order ID");
        Delivery storage delivery = deliveries[_id];
        require(delivery.status == DeliveryStatus.InTransit, "Order is not in InTransit state");
        require(delivery.user == msg.sender, "Access denied");

        delivery.status = DeliveryStatus.Delivered;

        emit OrderCompleted(_id);
    }
}

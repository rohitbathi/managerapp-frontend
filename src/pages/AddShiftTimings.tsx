import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "../styles/ShiftTimingStyles";

const AddShiftTimings = () => {
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showShiftModal, setShowShiftModal] = useState(false);
  const [shiftStartTime, setShiftStartTime] = useState(null);
  const [shiftEndTime, setShiftEndTime] = useState(null);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  // Dummy staff list fetched via useEffect
  useEffect(() => {
    const fetchStaffList = async () => {
      try {
        // const Staff = await fetchStaffList()
        // setStaffList(Staff)
        setStaffList([
          { id: "1", name: "John Doe" },
          { id: "2", name: "Jane Smith" },
          { id: "3", name: "Alice Johnson" },
        ]);
      } catch (error) {
        Alert.alert("error fetching Staff Appointments");
      }
    };
    fetchStaffList();
  }, []);

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      setShowShiftModal(true);
    }
  };

  const handleAssignShift = () => {
    console.log("Shift Assigned:", {
      staffName: selectedStaff.name,
      date: selectedDate.toDateString(),
      startTime: shiftStartTime?.toLocaleTimeString(),
      endTime: shiftEndTime?.toLocaleTimeString(),
    });
    setShowShiftModal(false);
    setSelectedStaff(null);
    setSelectedDate(null);
    setShiftStartTime(null);
    setShiftEndTime(null);
    Alert.prompt("Shift Assigned Successfully")
  };

  const openDatePicker = (staff) => {
    setSelectedStaff(staff);
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Staff List</Text>
      <FlatList
        data={staffList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.staffItem}>
            <Text style={styles.staffName}>{item.name}</Text>
            <Button title="Assign Shift" onPress={() => openDatePicker(item)} />
          </View>
        )}
      />

      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Modal visible={showShiftModal} transparent={true} animationType="slide">
        <View style={styles.cardModalContainer}>
          <Text style={styles.modalTitle}>Assign Shift</Text>
          <Text style={styles.modalText}>Staff: {selectedStaff?.name}</Text>
          <Text style={styles.modalText}>
            Date: {selectedDate?.toDateString()}
          </Text>

          <TouchableOpacity
            style={styles.inputField}
            onPress={() => setShowStartTimePicker(true)}
          >
            <Text>
              Start Time:{" "}
              {shiftStartTime?.toLocaleTimeString() || "Select Time"}
            </Text>
          </TouchableOpacity>
          {showStartTimePicker && (
            <DateTimePicker
              value={shiftStartTime || new Date()}
              mode="time"
              is24Hour={true}
              display="spinner"
              onChange={(event, time) => {
                setShowStartTimePicker(false);
                if (time) {
                  setShiftStartTime(time);
                  // Reset end time if it is earlier than the new start time
                  if (shiftEndTime && time > shiftEndTime) {
                    setShiftEndTime(null);
                  }
                }
              }}
            />
          )}

          <TouchableOpacity
            style={styles.inputField}
            onPress={() => setShowEndTimePicker(true)}
          >
            <Text>
              End Time: {shiftEndTime?.toLocaleTimeString() || "Select Time"}
            </Text>
          </TouchableOpacity>
          {showEndTimePicker && (
            <DateTimePicker
              value={shiftEndTime || new Date()}
              mode="time"
              is24Hour={true}
              display="spinner"
              onChange={(event, time) => {
                setShowEndTimePicker(false);
                if (time && (!shiftStartTime || time > shiftStartTime)) {
                  setShiftEndTime(time);
                } else {
                  alert("End time must be after start time");
                }
              }}
            />
          )}

          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="Assign Shift" onPress={handleAssignShift} />
            </View>
            <View style={styles.button}>
              <Button
                title="Close"
                onPress={() => setShowShiftModal(false)}
                color="#ff5c5c"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddShiftTimings;

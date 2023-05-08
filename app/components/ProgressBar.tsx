import { StyleSheet, Text, View } from "react-native";

interface ProgressSquareProps {
  result?: boolean;
}

interface ProgressBarProps {
  squares: ProgressSquareProps[];
  score: number;
}

const ProgressSquare = ({ result }: ProgressSquareProps) => {
  return (
    <View style={{
      width: 25,
      height: 25,
      marginHorizontal: 1,
      borderRadius: 10,
      backgroundColor: result !== undefined ? (result ? '#00ff44' : '#f21f1f') : 'gray'
    }} />
  )
}

export default function ProgressBar({ squares, score }: ProgressBarProps) {

  return (
    <View style={styles.progressBar}>
      <View style={styles.progressSquares}>
        {squares?.map((square, idx) =>
          <ProgressSquare key={idx} result={square.result} />
        )}
      </View>
      <Text style={styles.score}>Score {score}/10</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  progressBar: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  progressSquares: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  score: {
    color: 'white',
    fontSize: 18
  }
})
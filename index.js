import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState(null);
  const [classificacao, setClassificacao] = useState('');

  const calcularIMC = () => {
    const pesoNum = parseFloat(peso.replace(',', '.'));
    const alturaNum = parseFloat(altura.replace(',', '.'));

    if (pesoNum && alturaNum) {
      const imc = pesoNum / (alturaNum * alturaNum);
      setResultado(imc.toFixed(2));

      if (imc < 18.5) {
        setClassificacao('Abaixo do peso');
      } else if (imc >= 18.5 && imc < 24.9) {
        setClassificacao('Peso normal');
      } else if (imc >= 25 && imc < 29.9) {
        setClassificacao('Sobrepeso');
      } else {
        setClassificacao('Obesidade');
      }
    } else {
      setResultado(null);
      setClassificacao('Por favor, insira valores válidos.');
    }
  };

  return (
    <View style={estilos.app}>
      <Text style={estilos.title}>Calculadora de IMC</Text>

      <TextInput
        style={estilos.input}
        placeholder="Peso (kg) - ex: 70.5"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />

      <TextInput
        style={estilos.input}
        placeholder="Altura (m) - ex: 1.75"
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
      />

      <Button title="Calcular" onPress={calcularIMC} />

      {resultado && (
        <View style={estilos.resultadoContainer}>
          <Text style={estilos.text}>Seu IMC: {resultado}</Text>
          <Text style={estilos.text}>Classificação: {classificacao}</Text>
        </View>
      )}

      {!resultado && classificacao ? (
         <View style={estilos.resultadoContainer}>
            <Text style={estilos.text}>{classificacao}</Text>
         </View>
      ) : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  resultadoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 5,
    color: '#333'
  },
});

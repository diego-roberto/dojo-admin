package com.budokan.dojoadmin.util;

public class GraduacaoHelper {

    /* retorna verdadeiro se o valor representa uma graduação Kyu. */
    public static boolean isKyu(int value) {
        return value >= 1 && value <= 11;
    }

    /* retorna verdadeiro se o valor representa uma graduação Dan (faixa preta). */
    public static boolean isDan(int value) {
        return value >= 91 && value <= 915;
    }

    /* retorna o número do Dan (1 a 9), ou 0 se não for válido. */
    public static int getDanLevel(int value) {
        return isDan(value) ? value % 10 : 0;
    }

    /* retorna label amigável, como "3º Kyu" ou "2º Dan" */
    public static String getLabel(int value) {
        if (isKyu(value)) {
            return value + "º Kyu";
        } else if (isDan(value)) {
            return getDanLevel(value) + "º Dan";
        } else {
            return "Desconhecido";
        }
    }

    /* permite ordenação: Dan > Kyu */
    public static int getRankingValue(int value) {
        return isDan(value) ? 100 + getDanLevel(value) : (11 - value); // Dan > Kyu
    }

}

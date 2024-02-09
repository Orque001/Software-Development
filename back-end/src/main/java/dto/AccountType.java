package dto;

public enum AccountType {
    Checking("Checking"),
    Savings("Savings");

    private final String stringValue;

    AccountType(final String stringValue){this.stringValue = stringValue;}

    @Override
    public String toString(){return stringValue;}
}

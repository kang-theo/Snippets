class Printer {
  doPrint(): any {
    console.log("Called Parent class.");
  }
}

class NewPrinter extends Printer {
  doPrint(): any {
    super.doPrint();
    console.log("Called Child class.");
  }
  doInkJetPrint(): any {
    console.log("Called doInkJetPrint().");
  }
}

// Declare a type: Declare printer as a constructor function for NewPrinter instances
let printer: new () => NewPrinter;

// Assign a constructor function to printer. Otherwise, variable 'printer' is used before being assigned.
printer = NewPrinter;

// Create a new instance of NewPrinter using the constructor function
let printerInstance = new printer();

// Call methods on the created instance
printerInstance.doPrint();
printerInstance.doInkJetPrint();  

import readline from "readline";
import scrapingColonia from "./scraping/lacolonia.js";
import scrapingWalmart from "./scraping/walmart.js";
import demostracion from "./scraping/demostracion.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function displayMenu() {
  console.clear();

  const terminalWidth = process.stdout.columns;
  const terminalHeight = process.stdout.rows;

  const horizontalCenterOffset = (terminalWidth - 25) / 2;
  const verticalCenterOffset = (terminalHeight - 7) / 2;

  console.log("\n".repeat(verticalCenterOffset));
  console.log(
    " ".repeat(horizontalCenterOffset) +
      "Menu de Scraping:".padEnd(terminalWidth)
  );
  console.log(" ".repeat(horizontalCenterOffset) + "1. Scraping La Colonia");
  console.log(" ".repeat(horizontalCenterOffset) + "2. Scraping Walmart");
  console.log(" ".repeat(horizontalCenterOffset) + "3. Demostracion Scraping");
  console.log(" ".repeat(horizontalCenterOffset) + "4. Programar Actualizacion");
  console.log(" ".repeat(horizontalCenterOffset) + "5. Salir");

  console.log();
  rl.question(
    " ".repeat(horizontalCenterOffset) + "Enter your choice: ",
    (answer) => {
      switch (parseInt(answer)) {
        case 1:
          console.clear();
          console.log("Iniciando Scraping La Colonia");
          scrapingColonia();
          break;
        case 2:
          console.clear();
          console.log("Iniciando Scraping Walmart");
          scrapingWalmart();
          break;
        case 3:
          console.clear();
          console.log("Iniciando Demostracion");
          demostracion()
          break;
        case 4:
          console.clear();
          console.log("Actualizacion Programada");
          const reloj = setInterval(espera, 1000);

          function espera() {
            const date = new Date();
            process.stdout.write(
              `La base de Datos se Actualizara cuando el reloj de la una de la madrugada: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} Faltan ${
                24 - (date.getHours() - 1)
              } Horas y ${
                60 - date.getMinutes()
              } minutos para la actualizacion\r`
            );

            if (date.getHours() == 14 && date.getMinutes() == 6) {
              clearInterval(reloj);
              scrapingColonia();
              scrapingWalmart();
            }
          }
          break;
        case 5:
          console.clear();
          console.log("Exiting...");
          rl.close();
          process.exit(0);
          break;
        default:
          console.log("Opcion no valida elija un numero ente 1 y 5");
      }

      rl.question("\nPress ENTER to continue...\n", () => {
        main();
      });
    }
  );
}

function main() {
  displayMenu();
}

main();

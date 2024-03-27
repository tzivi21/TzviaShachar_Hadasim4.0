using System;

class Program
{
    static void Main(string[] args)
    {
        while (true)
        {
            Console.WriteLine("Welcome to the Tower Calculator!");
            Console.WriteLine("1. Calculate rectangle tower (square or rectangle)");
            Console.WriteLine("2. Calculate triangle tower");
            Console.WriteLine("3. Exit");

            Console.Write("Enter your choice: ");
            int choice = int.Parse(Console.ReadLine());

            if (choice == 3)
            {
                Console.WriteLine("Exiting the program. Goodbye!");
                break;
            }

            switch (choice)
            {
                case 1:
                    Console.Write("Enter the width of the tower: ");
                    double width = double.Parse(Console.ReadLine());
                    Console.Write("Enter the height of the tower: ");
                    double height = double.Parse(Console.ReadLine());

                    if (width <= 0 || height <= 0)
                    {
                        Console.WriteLine("Invalid input. Width and height must be positive numbers.");
                        break;
                    }

                    if (width == height)
                    {
                        Console.WriteLine($"The area of the square tower is: {width * width}");
                    }
                    else if(width-height>5||height-width>5)
                    {
                        Console.WriteLine($"The perimeter of the rectangle tower is: {(width + height) * 2}");
                    }
                    else
                    {
                        Console.WriteLine("Invalid input. the difference between the height and the width must be more than 5.");

                    }
                    break;

                case 2:
                    Console.Write("Enter the width of the tower: ");
                    float widthT = float.Parse(Console.ReadLine());
                    Console.Write("Enter the height of the tower: ");
                    float heightT = float.Parse(Console.ReadLine());

                    if (widthT <= 0||heightT<=0)
                    {
                        Console.WriteLine("Invalid input. Height must be a positive number.");
                        break;
                    }

                    Console.WriteLine($"1. Calculate perimeter of the triangle tower");
                    Console.WriteLine($"2. Print the triangle tower");

                    Console.Write("Enter your choice: ");
                    int triangleChoice = int.Parse(Console.ReadLine());

                    switch (triangleChoice)
                    {
                        case 1:
                            double trianglePerimeter = CalculateTrianglePerimeter(widthT,heightT);
                            Console.WriteLine($"The perimeter of the triangle tower is: {trianglePerimeter}");
                            break;

                        case 2:
                            if (widthT % 2 == 0 || widthT> 2*heightT)
                            {
                                Console.WriteLine("Cannot print the triangle tower.");
                            }
                            else
                            {
                                //prints the last row
                                for (int i = 0; i < (int)widthT / 2; i++)
                                {
                                    Console.Write(" ");
                                }
                                Console.Write("*");
                                for (int i = 0; i < (int)widthT / 2; i++)
                                {
                                    Console.Write(" ");
                                }
                                Console.Write('\n');
                                //number of passible rows in the tower without the button and the top layer
                                // for example: width=5, num of rows passible=1 (3 stars)
                                int num_of_rows_passible=(int)((widthT-2)/2);
                                //handle edge cases
                                if (widthT == 3 || widthT == 1)
                                {
                                    num_of_rows_passible = 1;
                                }
                                //how many times each row passible need to show to fill the height of the tower
                                int num_of_each_row= (int)((heightT-2)/num_of_rows_passible);
                                //the left for the top layer
                                int last_row_lefts = (int)((heightT - 2) % num_of_rows_passible);
                                for (int i = 3; i <=widthT-2 ; i+=2)
                                {
                                    int starsCount = i;
                                    int spaceCount = (int)((widthT-i) / 2);
                                    for (int k = 0; k < num_of_each_row; k++)
                                    {
                                        for (int j = 0; j < spaceCount; j++)
                                        {
                                            Console.Write(" ");
                                        }
                                        for (int j = 0; j < starsCount ; j++)
                                        {
                                            Console.Write("*");
                                        }
                                        for (int j = 0; j < spaceCount; j++)
                                        {
                                            Console.Write(" ");
                                        }
                                        Console.Write('\n');
                                        //the last layer lefts printing
                                        if (i == 3 && last_row_lefts > 0)
                                        {
                                            k--;
                                            last_row_lefts--;
                                        }
                                    }
                                }
                                //p count how many time to print the bottom row
                                int p = 1;
                                //prints the bottom row
                                if (widthT == 3||widthT==1)
                                {
                                    p+=num_of_each_row;
                                }
                                for (; p>0; p--)
                                {
                                    for (int i = 0; i < widthT; i++)
                                    {
                                        Console.Write("*");
                                    }
                                    Console.Write('\n');
                                }
                                

                            }
                            break;

                        default:
                            Console.WriteLine("Invalid choice for triangle tower.");
                            break;
                    }
                    break;

                default:
                    Console.WriteLine("Invalid choice. Please select 1, 2, or 3.");
                    break;
            }
            //function to calculate the perimeter by using Pythagoras
            static double CalculateTrianglePerimeter(double baseLength, double height)
            {
                double side = Math.Sqrt(Math.Pow(baseLength, 2) + Math.Pow(height / 2, 2));
                double perimeter = baseLength + 2 * side;
                return perimeter;
            }
        }
    }
}

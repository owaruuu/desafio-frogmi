#lib/tasks/decimal.rake

desc "prueba una wea"
task :decimal => :environment do
    require 'bigdecimal'

    # String
    string_value = "123.456"

    # Convert to decimal
    decimal_value = BigDecimal(string_value)

    # Output
    puts decimal_value.class
    puts decimal_value  # Output: 0.123456E3
end


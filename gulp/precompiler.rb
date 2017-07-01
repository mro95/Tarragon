last_space_count = -1
result = ''
nl = "\n"
File.open('layout.tg').each_line.with_index do | line, n |
    space_count = line.count(' ')/2
    stripped_line = line.strip
    if space_count > last_space_count
        result << '<div '
        result << stripped_line
        result << ' >'
        result << nl
    end
    if space_count == last_space_count
        result << '</div>'
        result << nl
        result << '<div '
        result << stripped_line
        result << ' >'
        result << nl
    end
    if space_count < last_space_count
        diff =  last_space_count-space_count
        if stripped_line.empty?
            diff.times {
                result << '</div>'
                result << nl
            }
        else
            diff.times {
                result << '</div>'
                result << nl
            }
            result << '<div class="'
            result << stripped_line
            result << '">'
            result << nl
        end
    end
    last_space_count = space_count
    #puts "#{space_count}: #{line}"
end

puts result
